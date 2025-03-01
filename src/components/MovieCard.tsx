"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TMDBMovie, TMDBShow } from "@/lib/tmdb";

interface MovieCardProps {
  movie: TMDBMovie | TMDBShow;
  showOverview?: boolean;
  actions?: React.ReactNode;
}

export function MovieCard({
  movie,
  showOverview = true,
  actions,
}: MovieCardProps) {
  const isMovie = "title" in movie;
  const title = isMovie ? movie.title : movie.name;
  const date = isMovie ? movie.release_date : movie.first_air_date;
  const link = isMovie ? `/movies/${movie.id}` : `/shows/${movie.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full group">
        <div className="relative aspect-[2/3] overflow-hidden">
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {showOverview && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm">
            <span>{new Date(date).getFullYear()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          {actions || (
            <>
              <Link href={link} className="flex-1">
                <Button className="w-full" variant="secondary">
                  Detayları Gör
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="cursor-pointer">
                📋
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
