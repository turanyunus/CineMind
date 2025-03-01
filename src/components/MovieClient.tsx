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
import { PollSection } from "@/components/PollSection";
import { formatCurrency, formatRuntime } from "@/lib/utils";
import {
  Star,
  Clock,
  Calendar,
  MessageCircle,
  Share2,
  Users,
  Film,
  ChevronRight,
  Bookmark,
  ThumbsUp,
  Eye,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { MovieCard } from "@/components/MovieCard";
import { TMDBMovie, TMDBCredits } from "@/lib/tmdb";
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
  session: unknown;
}

export function MovieClient({
  movie,
  recommendations,
  credits,
  dbMovie,
  session,
}: MovieClientProps) {
  const director = credits?.crew?.find((person) => person.job === "Director");
  const cast = credits?.cast?.slice(0, 10) || [];

  return (
    <Layout>
      {/* Movie Details Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-background via-background/95 to-background/90">
        <div className="container mx-auto px-4">
          {/* Background Image with Blur */}
          {movie.backdrop_path && (
            <div className="fixed inset-0 -z-10 opacity-10">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt=""
                fill
                className="object-cover blur-sm"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60"></div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Movie Poster Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden border-none shadow-xl bg-background/50 backdrop-blur-sm relative group">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Film className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-black/50 backdrop-blur-sm text-white border-none px-2.5 py-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 mr-1" />
                        {movie.vote_average.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 relative z-10">
                    <div className="flex flex-col gap-3">
                      {session &&
                      typeof session === "object" &&
                      "user" in session ? (
                        <>
                          <Button className="w-full bg-primary hover:bg-primary/90 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                            <Eye className="w-4 h-4 mr-2 relative z-10" />
                            <span className="relative z-10">İzledim</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full group relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-primary/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                            <Bookmark className="w-4 h-4 mr-2 relative z-10" />
                            <span className="relative z-10">İzleyeceğim</span>
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 group relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-primary/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                              <ThumbsUp className="w-4 h-4 mr-2 relative z-10" />
                              <span className="relative z-10">Beğen</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 group relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-primary/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                              <Share2 className="w-4 h-4 mr-2 relative z-10" />
                              <span className="relative z-10">Paylaş</span>
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Link href="/auth/signin" className="w-full">
                          <Button className="w-full group relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                            <span className="relative z-10">Giriş Yap</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Movie Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="border-none shadow-xl bg-background/50 backdrop-blur-sm relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

                <CardHeader className="relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        Film
                      </Badge>
                      {movie.status && (
                        <Badge variant="outline" className="text-xs">
                          {movie.status}
                        </Badge>
                      )}
                      {movie.original_language && (
                        <Badge variant="outline" className="text-xs">
                          {movie.original_language.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <CardTitle className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                        {movie.title}
                      </CardTitle>
                      {movie.tagline && (
                        <CardDescription className="text-base mt-1 italic">
                          &ldquo;{movie.tagline}&rdquo;
                        </CardDescription>
                      )}
                    </motion.div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                      {movie.release_date && (
                        <span className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-full">
                          <Calendar className="w-4 h-4" />
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      )}
                      {movie.runtime && (
                        <span className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-full">
                          <Clock className="w-4 h-4" />
                          {formatRuntime(movie.runtime)}
                        </span>
                      )}
                      <span className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary rounded-full"></span>
                      Özet
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {movie.overview}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary rounded-full"></span>
                      Türler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres?.map((genre) => (
                        <Link href={`/genre/${genre.id}`} key={genre.id}>
                          <Badge
                            variant="secondary"
                            className="cursor-pointer hover:bg-secondary/80 transition-colors"
                          >
                            {genre.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {director && (
                      <div className="space-y-1 bg-background/30 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Yönetmen
                        </h4>
                        <Link
                          href={`/person/${director.id}`}
                          className="text-sm hover:text-primary transition-colors font-medium"
                        >
                          {director.name}
                        </Link>
                      </div>
                    )}
                    {movie.budget !== undefined && movie.budget > 0 && (
                      <div className="space-y-1 bg-background/30 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Bütçe
                        </h4>
                        <p className="text-sm font-medium">
                          {formatCurrency(movie.budget)}
                        </p>
                      </div>
                    )}
                    {movie.revenue !== undefined && movie.revenue > 0 && (
                      <div className="space-y-1 bg-background/30 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Hasılat
                        </h4>
                        <p className="text-sm font-medium">
                          {formatCurrency(movie.revenue)}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Cast Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <span className="w-1 h-5 bg-primary rounded-full"></span>
                        Oyuncular
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs group"
                        onClick={() =>
                          document.getElementById("cast-tab")?.click()
                        }
                      >
                        Tümünü Gör
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                      {cast.slice(0, 5).map((person) => (
                        <Link
                          href={`/person/${person.id}`}
                          key={person.id}
                          className="flex-shrink-0 w-16 group"
                        >
                          <div className="space-y-1 text-center">
                            <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border border-border group-hover:border-primary transition-colors">
                              {person.profile_path ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                  alt={person.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                  <Users className="w-6 h-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs font-medium line-clamp-1 group-hover:text-primary transition-colors">
                              {person.name}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto py-12 px-4">
        <Tabs defaultValue="cast" className="space-y-8">
          <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-background border-b border-border/40 p-0 overflow-x-auto">
            <TabsTrigger
              id="cast-tab"
              value="cast"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Users className="w-4 h-4" />
              Oyuncular
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <MessageCircle className="w-4 h-4" />
              Yorumlar
            </TabsTrigger>
            <TabsTrigger
              value="similar"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Film className="w-4 h-4" />
              Benzer Filmler
            </TabsTrigger>
            <TabsTrigger
              value="poll"
              className="flex items-center gap-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <Award className="w-4 h-4" />
              Anket
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cast">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {cast.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/person/${person.id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-border/50 group">
                      <div className="relative aspect-[2/3]">
                        {person.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                            alt={person.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Users className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {person.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {person.character}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comments">
            <CommentSection movieId={dbMovie.id} />
          </TabsContent>

          <TabsContent value="similar">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {recommendations.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="poll">
            <PollSection movieId={dbMovie.id} />
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
