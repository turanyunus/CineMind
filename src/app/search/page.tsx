import { SearchClient } from "@/components/SearchClient";
import { tmdb } from "@/lib/tmdb";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const movies = query ? await tmdb.searchMovies(query) : [];

  return <SearchClient initialMovies={movies} initialQuery={query} />;
}
