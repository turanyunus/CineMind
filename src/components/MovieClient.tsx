"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { CommentSection } from "@/components/CommentSection";
import { LikeButton } from "@/components/LikeButton";
import { PollSection } from "@/components/PollSection";
import { formatCurrency, formatRuntime } from "@/lib/utils";
import {
  Play,
  Star,
  Clock,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  ListPlus,
  Users,
  DollarSign,
  Globe,
  Languages,
  Film,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { MovieCard } from "@/components/MovieCard";
import { TMDBMovie, TMDBShow, TMDBCredit, TMDBCredits } from "@/lib/tmdb";
import { Layout } from "@/components/layout/Layout";

interface MovieClientProps {
  movie: TMDBMovie;
  recommendations: TMDBMovie[];
  credits: TMDBCredits;
  dbMovie: {
    id: string;
    tmdbId: number;
    title: string;
    posterPath: string | null;
    releaseDate: Date | null;
    overview: string;
    voteAverage: number;
    genres: string[];
  };
  session: any;
}

export function MovieClient({
  movie,
  recommendations,
  credits,
  dbMovie,
  session,
}: MovieClientProps) {
  const director = credits?.crew?.find((person) => person.job === "Director");
  const writers = credits?.crew?.filter(
    (person) => person.department === "Writing"
  );
  const cast = credits?.cast?.slice(0, 10) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-end">
        <div className="absolute inset-0">
          {movie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover brightness-75"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="relative container mx-auto pb-16 pt-32 px-4">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Movie Poster */}
            <div className="hidden md:block w-[240px] shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[2/3] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                {movie.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                )}
              </motion.div>
            </div>

            {/* Movie Details */}
            <div className="flex-1 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <Badge
                    variant="secondary"
                    className="text-sm font-medium px-3 py-1 mb-4 inline-block"
                  >
                    Film
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_20%)]">
                    {movie.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-base mb-6">
                    <span className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                      <Star className="w-5 h-5 text-yellow-400" />
                      {movie.vote_average.toFixed(1)} Puan
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                      <Calendar className="w-5 h-5" />
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                    {movie.runtime && (
                      <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                        <Clock className="w-5 h-5" />
                        {formatRuntime(movie.runtime)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres?.map((genre) => (
                      <Link
                        href={`/genre/${genre.id}`}
                        key={genre.id}
                        className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-sm text-white font-medium cursor-pointer backdrop-blur-sm"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <p className="text-base md:text-lg leading-relaxed text-white/90 font-medium max-w-2xl">
                  {movie.overview}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {session?.user ? (
                    <>
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium h-12 px-6"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        İzledim
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer text-white font-medium h-12 px-6 backdrop-blur-sm"
                      >
                        <ListPlus className="w-5 h-5 mr-2" />
                        İzleyeceğim
                      </Button>
                      <LikeButton movieId={dbMovie.id} />
                    </>
                  ) : (
                    <Link href="/auth/signin">
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium h-12 px-6"
                      >
                        Giriş Yap
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-8">
                  {director && (
                    <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                      <h4 className="text-sm font-medium text-white/60 mb-1">
                        Yönetmen
                      </h4>
                      <Link
                        href={`/person/${director.id}`}
                        className="text-white font-medium hover:text-primary transition-colors cursor-pointer"
                      >
                        {director.name}
                      </Link>
                    </div>
                  )}
                  {movie.budget && movie.budget > 0 && (
                    <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                      <h4 className="text-sm font-medium text-white/60 mb-1">
                        Bütçe
                      </h4>
                      <p className="text-white font-medium">
                        {formatCurrency(movie.budget)}
                      </p>
                    </div>
                  )}
                  {movie.revenue && movie.revenue > 0 && (
                    <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                      <h4 className="text-sm font-medium text-white/60 mb-1">
                        Hasılat
                      </h4>
                      <p className="text-white font-medium">
                        {formatCurrency(movie.revenue)}
                      </p>
                    </div>
                  )}
                  <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                    <h4 className="text-sm font-medium text-white/60 mb-1">
                      Durum
                    </h4>
                    <p className="text-white font-medium">{movie.status}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto py-8 px-4">
        <Tabs defaultValue="cast" className="space-y-6">
          <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-background border-b border-border/40 p-0">
            <TabsTrigger
              value="cast"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Users className="w-4 h-4" />
              Oyuncular
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Film className="w-4 h-4" />
              Detaylar
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <MessageCircle className="w-4 h-4" />
              Yorumlar
            </TabsTrigger>
            <TabsTrigger
              value="polls"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Share2 className="w-4 h-4" />
              Anketler
            </TabsTrigger>
            <TabsTrigger
              value="similar"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Heart className="w-4 h-4" />
              Benzer Filmler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cast" className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Oyuncular</h2>
              <Button variant="ghost" className="text-primary cursor-pointer">
                Tümünü Gör
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cast.map((person) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/person/${person.id}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm">
                      <div className="relative aspect-[2/3]">
                        {person.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                            alt={person.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted flex items-center justify-center">
                            <Users className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                          {person.name}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {person.character}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Yapım Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {movie.production_companies &&
                    movie.production_companies.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Yapım Şirketleri
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {movie.production_companies.map((company) => (
                            <Badge
                              key={company.id}
                              variant="outline"
                              className="text-base py-1.5"
                            >
                              {company.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {movie.production_countries &&
                    movie.production_countries.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Yapım Ülkeleri
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {movie.production_countries.map((country) => (
                            <Badge
                              key={country.iso_3166_1}
                              variant="outline"
                              className="text-base py-1.5"
                            >
                              {country.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Dil ve Ekip
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {movie.spoken_languages &&
                    movie.spoken_languages.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Konuşulan Diller
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {movie.spoken_languages.map((language) => (
                            <Badge
                              key={language.iso_639_1}
                              variant="outline"
                              className="text-base py-1.5"
                            >
                              {language.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {writers && writers.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Yazarlar</h3>
                      <div className="flex flex-wrap gap-2">
                        {writers.map((writer) => (
                          <Badge
                            key={writer.id}
                            variant="outline"
                            className="text-base py-1.5"
                          >
                            {writer.name} ({writer.job})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comments">
            <CommentSection movieId={dbMovie.id} />
          </TabsContent>

          <TabsContent value="polls">
            <PollSection movieId={dbMovie.id} />
          </TabsContent>

          <TabsContent value="similar">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {recommendations.slice(0, 10).map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
