import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MovieCard } from "@/components/MovieCard";
import { tmdb } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import { Layout } from "@/components/layout/Layout";

const moods = {
  happy: {
    title: "Mutlu Eden Filmler",
    description: "Keyifli vakit geçirmenizi sağlayacak filmler",
    genres: [35, 10751], // Comedy, Family
  },
  sad: {
    title: "Duygusal Filmler",
    description: "Hislerinize tercüman olacak filmler",
    genres: [18, 10749], // Drama, Romance
  },
  excited: {
    title: "Heyecan Verici Filmler",
    description: "Adrenalin dolu macera filmleri",
    genres: [28, 12], // Action, Adventure
  },
  relaxed: {
    title: "Rahatlatıcı Filmler",
    description: "Sakin ve huzurlu filmler",
    genres: [99, 36], // Documentary, History
  },
};

interface RecommendationsPageProps {
  params: {
    mood: string;
  };
}

export default async function RecommendationsPage({
  params,
}: RecommendationsPageProps) {
  const mood = params.mood.toLowerCase();

  if (!moods[mood as keyof typeof moods]) {
    notFound();
  }

  const { title, description, genres } = moods[mood as keyof typeof moods];

  // Her ruh hali için iki farklı türden film önerileri al
  const [genre1Movies, genre2Movies] = await Promise.all([
    tmdb.getMoviesByGenre(genres[0]),
    tmdb.getMoviesByGenre(genres[1]),
  ]);

  // İki türden gelen filmleri birleştir ve karıştır
  const movies = [...genre1Movies, ...genre2Movies]
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  return (
    <Layout>
      <main className="container mx-auto py-12 px-4">
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
