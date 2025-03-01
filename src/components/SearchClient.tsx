"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MovieCard } from "@/components/MovieCard";
import { motion } from "framer-motion";
import { TMDBMovie } from "@/lib/tmdb";
import { Layout } from "@/components/layout/Layout";

interface SearchClientProps {
  initialMovies: TMDBMovie[];
  initialQuery: string;
}

export function SearchClient({
  initialMovies,
  initialQuery,
}: SearchClientProps) {
  return (
    <Layout>
      <main className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Film Ara</CardTitle>
                <CardDescription>
                  İzlemek istediğiniz veya izlediğiniz filmleri arayın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-2" action="/search">
                  <Input
                    name="q"
                    placeholder="Film adı yazın..."
                    defaultValue={initialQuery}
                    className="flex-1"
                  />
                  <Button type="submit">Ara</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {initialQuery && (
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-semibold"
              >
                "{initialQuery}" için arama sonuçları
              </motion.h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {initialMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
                {initialMovies.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-full"
                  >
                    <Card className="p-8 text-center">
                      <CardTitle className="mb-2">Film Bulunamadı</CardTitle>
                      <CardDescription>
                        Farklı bir arama terimi deneyin
                      </CardDescription>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
