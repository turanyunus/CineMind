"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TMDBMovie, TMDBShow } from "@/lib/tmdb";
import { Star, Info, ListPlus, Calendar } from "lucide-react";

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
  const releaseDate = isMovie
    ? movie.release_date || ""
    : movie.first_air_date || "";
  const link = isMovie ? `/movies/${movie.id}` : `/shows/${movie.id}`;

  // Format year safely
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full group border-border/40 hover:border-primary/30 transition-colors duration-300 hover:shadow-lg">
        <div className="relative aspect-[2/3] overflow-hidden">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-black/50 backdrop-blur-sm text-white border-none px-2 py-0.5 text-xs">
              <Star className="w-3 h-3 text-yellow-400 mr-1" />
              {movie.vote_average.toFixed(1)}
            </Badge>
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 left-2 z-10">
            <Badge
              variant="outline"
              className="bg-black/50 backdrop-blur-sm text-white border-white/20 text-xs"
            >
              {isMovie ? "Film" : "Dizi"}
            </Badge>
          </div>

          {showOverview && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 transform translate-y-2 group-hover:translate-y-0">
              <p className="text-white text-sm line-clamp-3 drop-shadow-md">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
        <CardHeader className="space-y-1 p-3">
          <CardTitle className="line-clamp-1 text-base group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-xs">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 inline" />
              {year}
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 mr-1 inline" />
              {movie.vote_average.toFixed(1)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-2 p-3 pt-0">
          {actions || (
            <>
              <Link href={link} className="flex-1">
                <Button
                  className="w-full h-8 text-xs group relative overflow-hidden"
                  variant="secondary"
                >
                  <div className="absolute inset-0 bg-primary/10 w-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <Info className="w-3 h-3 mr-1 relative z-10" />
                  <span className="relative z-10">Detaylar</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 cursor-pointer group"
              >
                <ListPlus className="w-4 h-4 group-hover:text-primary transition-colors" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
