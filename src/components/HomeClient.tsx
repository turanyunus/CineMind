"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import { motion } from "framer-motion";
import { TMDBMovie, TMDBShow } from "@/lib/tmdb";
import {
  Star,
  Calendar,
  TrendingUp,
  Award,
  Film,
  Smile,
  Zap,
  Search,
  Tv,
  ChevronRight,
  Info,
  Sparkles,
  Flame,
  Crown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";

interface HomeClientProps {
  trendingMovies: TMDBMovie[];
  trendingShows: TMDBShow[];
  featuredContent: TMDBMovie | TMDBShow;
  actionMovies: TMDBMovie[];
  comedyMovies: TMDBMovie[];
  dramaMovies: TMDBMovie[];
}

export function HomeClient({
  trendingMovies,
  trendingShows,
  featuredContent,
  actionMovies,
  comedyMovies,
  dramaMovies,
}: HomeClientProps) {
  return (
    <Layout>
      {/* Hero Section - New Design */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Welcome Card */}
            <Card className="col-span-1 lg:col-span-2 overflow-hidden border-none shadow-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm relative">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

              <CardContent className="p-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-3xl md:text-4xl font-bold"
                    >
                      <span className="bg-clip-text  bg-gradient-to-r from-primary to-primary-foreground">
                        Hoş Geldiniz
                      </span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-lg text-muted-foreground"
                    >
                      Milyonlarca film ve dizi. Keşfedin ve takip edin.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Link href="/movies/popular">
                      <Button className="w-full h-auto py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg group relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                        <div className="flex flex-col items-center text-center relative z-10">
                          <Film className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-base font-medium">
                            Popüler Filmler
                          </span>
                          <span className="text-xs text-white/80 mt-1">
                            En çok izlenen filmler
                          </span>
                        </div>
                      </Button>
                    </Link>
                    <Link href="/shows/popular">
                      <Button
                        variant="outline"
                        className="w-full h-auto py-6 border-primary/20 bg-primary/5 hover:bg-primary/10 shadow-lg group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-primary/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                        <div className="flex flex-col items-center text-center relative z-10">
                          <Tv className="w-6 h-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-base font-medium">
                            Popüler Diziler
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Trend olan diziler
                          </span>
                        </div>
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <Link href="/recommendations">
                      <Button
                        variant="ghost"
                        className="w-full h-auto py-4 hover:bg-primary/5 flex flex-col items-center group"
                      >
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Sparkles className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="text-sm">Öneriler</span>
                      </Button>
                    </Link>
                    <Link href="/chat">
                      <Button
                        variant="ghost"
                        className="w-full h-auto py-4 hover:bg-primary/5 flex flex-col items-center group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Zap className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-sm">AI Asistan</span>
                      </Button>
                    </Link>
                    <Link href="/search">
                      <Button
                        variant="ghost"
                        className="w-full h-auto py-4 hover:bg-primary/5 flex flex-col items-center group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Search className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-sm">Ara</span>
                      </Button>
                    </Link>
                    <Link href="/premium">
                      <Button
                        variant="ghost"
                        className="w-full h-auto py-4 hover:bg-primary/5 flex flex-col items-center group"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Crown className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className="text-sm">Premium</span>
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Featured Content Card */}
            <Card className="col-span-1 overflow-hidden border-none shadow-xl relative group h-full">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {featuredContent?.backdrop_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${featuredContent.backdrop_path}`}
                    alt={
                      featuredContent.title ||
                      featuredContent.name ||
                      "Featured Content"
                    }
                    fill
                    className="object-cover z-0 group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
              <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Badge
                    variant="outline"
                    className="mb-2 w-fit border-white/20 text-white bg-black/40 backdrop-blur-sm"
                  >
                    {"title" in featuredContent ? "Film" : "Dizi"}
                  </Badge>
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
                    {featuredContent.title || featuredContent.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-3 drop-shadow-sm">
                    {featuredContent.overview}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center gap-1 text-sm text-white/90 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {featuredContent.vote_average.toFixed(1)}
                    </span>
                    <span className="text-white/50">•</span>
                    <span className="text-sm text-white/90 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                      <Calendar className="w-4 h-4 inline-block mr-1" />
                      {new Date(
                        featuredContent.release_date ||
                          featuredContent.first_air_date ||
                          ""
                      ).getFullYear()}
                    </span>
                  </div>
                  <Link
                    href={`/${
                      "title" in featuredContent ? "movies" : "shows"
                    }/${featuredContent.id}`}
                  >
                    <Button className="w-full bg-primary/90 hover:bg-primary group relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                      <Info className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">Detayları Gör</span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Trend İçerikler</h2>
            </motion.div>
            <div className="flex items-center gap-4"></div>
          </div>
          <Tabs defaultValue="movies" className="space-y-8">
            <TabsList className="bg-background/50 p-1 rounded-lg border border-border/30">
              <TabsTrigger
                value="movies"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Film className="w-4 h-4" />
                Filmler
              </TabsTrigger>
              <TabsTrigger
                value="shows"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Tv className="w-4 h-4" />
                Diziler
              </TabsTrigger>
            </TabsList>
            <TabsContent value="movies">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {trendingMovies.slice(0, 6).map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="shows">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {trendingShows.slice(0, 6).map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <MovieCard movie={show} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Action Movies */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold">Aksiyon Filmleri</h2>
            </motion.div>
            <Link href="/genre/28">
              <Button
                variant="ghost"
                size="sm"
                className="group cursor-pointer"
              >
                Tümünü Gör
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {actionMovies.slice(0, 6).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comedy Movies */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Smile className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-semibold">Komedi Filmleri</h2>
            </motion.div>
            <Link href="/genre/35">
              <Button
                variant="ghost"
                size="sm"
                className="group cursor-pointer"
              >
                Tümünü Gör
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {comedyMovies.slice(0, 6).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Drama Movies */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Drama Filmleri</h2>
            </motion.div>
            <Link href="/genre/18">
              <Button
                variant="ghost"
                size="sm"
                className="group cursor-pointer"
              >
                Tümünü Gör
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {dramaMovies.slice(0, 6).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
