"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  movieId?: string;
  commentId?: string;
  reviewId?: string;
}

export function LikeButton({ movieId, commentId, reviewId }: LikeButtonProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      checkLikeStatus();
    }
  }, [session, movieId, commentId, reviewId]);

  const checkLikeStatus = async () => {
    try {
      const params = new URLSearchParams();
      if (movieId) params.append("movieId", movieId);
      if (commentId) params.append("commentId", commentId);
      if (reviewId) params.append("reviewId", reviewId);

      const response = await fetch(`/api/likes?${params}`);
      const data = await response.json();
      setLiked(data.liked);
    } catch (error) {
      console.error("Failed to check like status:", error);
    }
  };

  const handleLike = async () => {
    if (!session?.user) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          commentId,
          reviewId,
        }),
      });

      const data = await response.json();
      setLiked(data.liked);
    } catch (error) {
      console.error("Failed to process like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-1",
        liked && "text-red-500 hover:text-red-600"
      )}
    >
      {liked ? "❤️" : "🤍"}
    </Button>
  );
}
