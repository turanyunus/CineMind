"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikeButton } from "@/components/LikeButton";
import Link from "next/link";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
  likes: {
    userId: string;
  }[];
}

interface CommentSectionProps {
  movieId: string;
}

export function CommentSection({ movieId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?movieId=${movieId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          content: newComment,
        }),
      });

      if (response.ok) {
        setNewComment("");
        await fetchComments();
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {session?.user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Yorumunuzu yazın..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Gönderiliyor..." : "Yorum Yap"}
          </Button>
        </form>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4">Yorum yapmak için giriş yapmalısınız</p>
            <Link href="/auth/signin">
              <Button>Giriş Yap</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.user.image || undefined} />
                    <AvatarFallback>
                      {comment.user.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <LikeButton commentId={comment.id} />
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </CardHeader>
          </Card>
        ))}

        {comments.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Henüz yorum yapılmamış. İlk yorumu siz yapın!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
