import { HomeClient } from "@/components/HomeClient";
import { tmdb } from "@/lib/tmdb";

export default async function Home() {
  // Trend içerikleri al
  const [trendingMovies, trendingShows] = await Promise.all([
    tmdb.getTrending(),
    tmdb.getTrendingShows(),
  ]);

  // Öne çıkan içerik olarak rastgele bir film veya dizi seç
  const allTrending = [...trendingMovies, ...trendingShows];
  const featuredContent =
    allTrending[Math.floor(Math.random() * allTrending.length)];

  // Farklı kategorilerde filmler al
  const [actionMovies, comedyMovies, dramaMovies] = await Promise.all([
    tmdb.getMoviesByGenre(28), // Action
    tmdb.getMoviesByGenre(35), // Comedy
    tmdb.getMoviesByGenre(18), // Drama
  ]);

  return (
    <HomeClient
      trendingMovies={trendingMovies}
      trendingShows={trendingShows}
      featuredContent={featuredContent}
      actionMovies={actionMovies}
      comedyMovies={comedyMovies}
      dramaMovies={dramaMovies}
    />
  );
}
