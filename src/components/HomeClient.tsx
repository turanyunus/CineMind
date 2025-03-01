"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import { motion } from "framer-motion";
import { TMDBMovie, TMDBShow } from "@/lib/tmdb";
import {
  ArrowRight,
  Play,
  Star,
  Calendar,
  ListPlus,
  Heart,
  TrendingUp,
  Clock,
  Award,
  Film,
  Smile,
  Zap,
  Search,
  Tv,
  Menu,
  ChevronRight,
  Info,
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
      {/* Featured Content */}
      <section className="relative min-h-[75vh] flex items-end">
        <div className="absolute inset-0">
          {featuredContent?.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${featuredContent.backdrop_path}`}
              alt={
                featuredContent.title ||
                featuredContent.name ||
                "Featured Content"
              }
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
            {/* Poster */}
            <div className="hidden md:block w-[240px] shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[2/3] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                {featuredContent.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${featuredContent.poster_path}`}
                    alt={
                      featuredContent.title ||
                      featuredContent.name ||
                      "Movie Poster"
                    }
                    fill
                    className="object-cover"
                  />
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="text-sm font-medium px-3 py-1"
                    >
                      {"title" in featuredContent ? "Film" : "Dizi"}
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_20%)]">
                    {featuredContent.title || featuredContent.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-base mb-6">
                    <span className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                      <Star className="w-5 h-5 text-yellow-400" />
                      {featuredContent.vote_average.toFixed(1)} Puan
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                      <Calendar className="w-5 h-5" />
                      {new Date(
                        featuredContent.release_date ||
                          featuredContent.first_air_date ||
                          ""
                      ).getFullYear()}
                    </span>
                  </div>
                </div>

                <p className="text-base md:text-lg leading-relaxed text-white/90 font-medium max-w-2xl">
                  {featuredContent.overview}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href={`/${
                      "title" in featuredContent ? "movies" : "shows"
                    }/${featuredContent.id}`}
                  >
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium h-12 px-6"
                    >
                      <Info className="w-5 h-5 mr-2" />
                      Detayları Gör
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer text-black font-medium h-12 px-6 backdrop-blur-sm"
                  >
                    <ListPlus className="w-5 h-5 mr-2" />
                    Listeme Ekle
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Trend İçerikler</h2>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/movies/popular">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group cursor-pointer"
                >
                  Tüm Filmler
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/shows/popular">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group cursor-pointer"
                >
                  Tüm Diziler
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          <Tabs defaultValue="movies" className="space-y-6">
            <TabsList className="bg-background/50 p-1 rounded-lg">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {trendingMovies.slice(0, 6).map((movie, index) => (
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
            <TabsContent value="shows">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {trendingShows.slice(0, 6).map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <MovieCard movie={show} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Mood Based Recommendations */}
        <section className="bg-muted/20 -mx-4 px-4 py-12 rounded-3xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-3">
                Ruh Halinize Göre Keşfedin
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                CineMind, ruh halinize uygun film önerileri sunar. Şu anki
                duygularınıza göre size özel seçilmiş filmler keşfedin.
              </p>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/recommendations/happy">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-yellow-500/10 p-6 rounded-xl text-center space-y-3 cursor-pointer"
              >
                <Smile className="w-10 h-10 text-yellow-500 mx-auto" />
                <h3 className="text-lg font-semibold">Mutlu</h3>
                <p className="text-sm text-muted-foreground">
                  Keyifli ve eğlenceli filmler
                </p>
              </motion.div>
            </Link>
            <Link href="/recommendations/excited">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-red-500/10 p-6 rounded-xl text-center space-y-3 cursor-pointer"
              >
                <Zap className="w-10 h-10 text-red-500 mx-auto" />
                <h3 className="text-lg font-semibold">Heyecanlı</h3>
                <p className="text-sm text-muted-foreground">
                  Aksiyon dolu maceralar
                </p>
              </motion.div>
            </Link>
            <Link href="/recommendations/relaxed">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-green-500/10 p-6 rounded-xl text-center space-y-3 cursor-pointer"
              >
                <Heart className="w-10 h-10 text-green-500 mx-auto" />
                <h3 className="text-lg font-semibold">Romantik</h3>
                <p className="text-sm text-muted-foreground">
                  Duygusal film seçkileri
                </p>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Genre Sections */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              Aksiyon Filmleri
            </h2>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {actionMovies.slice(0, 6).map((movie, index) => (
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
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Smile className="w-5 h-5 text-primary" />
              Komedi Filmleri
            </h2>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {comedyMovies.slice(0, 6).map((movie, index) => (
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
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Drama Filmleri
            </h2>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {dramaMovies.slice(0, 6).map((movie, index) => (
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
        </section>

        {/* Join Section */}
        <section className="bg-primary/5 -mx-4 px-4 py-16 rounded-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <h2 className="text-2xl font-bold">CineMind'a Katılın</h2>
            <p className="text-base text-muted-foreground">
              Kişiselleştirilmiş film önerileri, özel koleksiyonlar ve daha
              fazlası için hemen ücretsiz hesap oluşturun.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  Ücretsiz Başla
                </Button>
              </Link>
              <Link href="/premium">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 cursor-pointer"
                >
                  Premium'u Keşfet
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
