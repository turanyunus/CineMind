import axios from "axios";

if (!process.env.NEXT_PUBLIC_TMDB_API_KEY) {
  throw new Error(
    "TMDB API anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin."
  );
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// API için özel axios instance oluşturalım
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "tr-TR",
  },
});

// Hata yakalama için interceptor ekleyelim
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("TMDB API Hatası: API anahtarı geçersiz veya eksik.");
    }
    return Promise.reject(error);
  }
);

export interface TMDBMovie {
  id: number;
  title: string;
  name?: never;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  first_air_date?: never;
  vote_average: number;
  genres?: { id: number; name: string }[];
  genre_ids?: number[];
  status?: string;
  budget?: number;
  revenue?: number;
  runtime?: number;
  original_language?: string;
  tagline?: string;
  production_companies?: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  production_countries?: { iso_3166_1: string; name: string }[];
  spoken_languages?: { iso_639_1: string; name: string }[];
}

export interface TMDBCredit {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
  department?: string;
}

export interface TMDBCredits {
  cast: TMDBCredit[];
  crew: TMDBCredit[];
}

export interface TMDBShow {
  id: number;
  name: string;
  title?: never;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  release_date?: never;
  vote_average: number;
  genres?: { id: number; name: string }[];
  genre_ids?: number[];
  status?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  networks?: { id: number; name: string; logo_path: string | null }[];
  origin_country?: string[];
  languages?: string[];
}

const tmdbService = {
  async searchMovies(query: string): Promise<TMDBMovie[]> {
    try {
      const response = await tmdbApi.get("/search/movie", {
        params: { query },
      });
      return response.data.results;
    } catch (error) {
      console.error("Film arama hatası:", error);
      return [];
    }
  },

  async getMovieDetails(id: number): Promise<TMDBMovie | null> {
    try {
      const response = await tmdbApi.get(`/movie/${id}`);
      return response.data;
    } catch (error) {
      console.error("Film detayları alma hatası:", error);
      return null;
    }
  },

  async getRecommendations(id: number): Promise<TMDBMovie[]> {
    try {
      const response = await tmdbApi.get(`/movie/${id}/recommendations`);
      return response.data.results;
    } catch (error) {
      console.error("Film önerileri alma hatası:", error);
      return [];
    }
  },

  async getTrending(): Promise<TMDBMovie[]> {
    try {
      const response = await tmdbApi.get("/trending/movie/week");
      return response.data.results;
    } catch (error) {
      console.error("Trend filmler alma hatası:", error);
      return [];
    }
  },

  async getMovieCredits(id: number): Promise<TMDBCredits | null> {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=tr-TR`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie credits:", error);
      return null;
    }
  },

  async getMoviesByGenre(genreId: number): Promise<TMDBMovie[]> {
    try {
      const response = await tmdbApi.get("/discover/movie", {
        params: {
          with_genres: genreId,
          sort_by: "popularity.desc",
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Türe göre film alma hatası:", error);
      return [];
    }
  },

  async getTrendingShows() {
    try {
      const res = await fetch(
        `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&language=tr-TR`
      );
      if (!res.ok) throw new Error("Failed to fetch trending shows");
      const data = await res.json();
      return data.results as TMDBShow[];
    } catch (error) {
      console.error("Error fetching trending shows:", error);
      return [];
    }
  },

  async getShowDetails(id: number) {
    try {
      const res = await fetch(
        `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=tr-TR`
      );
      if (!res.ok) throw new Error("Failed to fetch show details");
      const data = await res.json();
      return data as TMDBShow;
    } catch (error) {
      console.error("Error fetching show details:", error);
      return null;
    }
  },

  async getShowCredits(id: number) {
    try {
      const res = await fetch(
        `${TMDB_BASE_URL}/tv/${id}/credits?api_key=${TMDB_API_KEY}&language=tr-TR`
      );
      if (!res.ok) throw new Error("Failed to fetch show credits");
      const data = await res.json();
      return data as TMDBCredits;
    } catch (error) {
      console.error("Error fetching show credits:", error);
      return null;
    }
  },

  async getShowRecommendations(id: number) {
    try {
      const res = await fetch(
        `${TMDB_BASE_URL}/tv/${id}/recommendations?api_key=${TMDB_API_KEY}&language=tr-TR`
      );
      if (!res.ok) throw new Error("Failed to fetch show recommendations");
      const data = await res.json();
      return data.results as TMDBShow[];
    } catch (error) {
      console.error("Error fetching show recommendations:", error);
      return [];
    }
  },
};

export const tmdb = tmdbService;
