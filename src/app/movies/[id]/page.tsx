import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { tmdb } from "@/lib/tmdb";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { MovieClient } from "@/components/MovieClient";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  const [movie, recommendations, credits] = await Promise.all([
    tmdb.getMovieDetails(movieId),
    tmdb.getRecommendations(movieId),
    tmdb.getMovieCredits(movieId),
  ]);

  const session = await getServerSession();

  // Get movie from database or create if not exists
  const dbMovie = movie
    ? await prisma.movie.upsert({
        where: { tmdbId: movieId },
        update: {},
        create: {
          tmdbId: movieId,
          title: movie.title,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date ? new Date(movie.release_date) : null,
          overview: movie.overview,
          voteAverage: movie.vote_average,
          genres: movie.genres?.map((g) => g.name) || [],
        },
      })
    : null;

  if (!movie || !dbMovie || !credits) {
    return (
      <main className="container mx-auto py-8">
        <Card className="p-6 text-center">
          <CardTitle className="mb-2">Film Bulunamadı</CardTitle>
          <CardDescription>
            Bu film bulunamadı veya bir hata oluştu.
          </CardDescription>
        </Card>
      </main>
    );
  }

  return (
    <MovieClient
      movie={movie}
      recommendations={recommendations}
      credits={credits}
      dbMovie={dbMovie}
      session={session}
    />
  );
}
