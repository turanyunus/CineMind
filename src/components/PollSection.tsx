"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: {
    optionIndex: number;
  }[];
  totalVotes: number;
  voteCounts: number[];
  votePercentages: number[];
  endsAt: string;
}

interface PollSectionProps {
  movieId: string;
}

export function PollSection({ movieId }: PollSectionProps) {
  const { data: session } = useSession();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", ""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, [movieId]);

  const fetchPolls = async () => {
    try {
      const response = await fetch(`/api/polls?movieId=${movieId}`);
      const data = await response.json();
      setPolls(data);
    } catch (error) {
      console.error("Failed to fetch polls:", error);
    }
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newPoll.question.trim() ||
      newPoll.options.some((opt) => !opt.trim())
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          question: newPoll.question,
          options: newPoll.options.filter((opt) => opt.trim()),
        }),
      });

      if (response.ok) {
        setNewPoll({ question: "", options: ["", ""] });
        setShowCreateForm(false);
        await fetchPolls();
      }
    } catch (error) {
      console.error("Failed to create poll:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (pollId: string, optionIndex: number) => {
    try {
      const response = await fetch("/api/polls", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId,
          optionIndex,
        }),
      });

      if (response.ok) {
        const updatedPoll = await response.json();
        setPolls((prevPolls) =>
          prevPolls.map((poll) =>
            poll.id === pollId ? { ...poll, ...updatedPoll } : poll
          )
        );
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const addOption = () => {
    setNewPoll((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index: number) => {
    if (newPoll.options.length <= 2) return;
    setNewPoll((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-8">
      {session?.user && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? "İptal" : "Anket Oluştur"}
          </Button>
        </div>
      )}

      {showCreateForm && (
        <Card>
          <form onSubmit={handleCreatePoll}>
            <CardHeader>
              <CardTitle>Yeni Anket</CardTitle>
              <CardDescription>
                Film hakkında diğer kullanıcılara bir soru sorun
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Sorunuzu yazın..."
                  value={newPoll.question}
                  onChange={(e) =>
                    setNewPoll((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                {newPoll.options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Seçenek ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        setNewPoll((prev) => ({
                          ...prev,
                          options: prev.options.map((opt, i) =>
                            i === index ? e.target.value : opt
                          ),
                        }))
                      }
                    />
                    {index >= 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
                {newPoll.options.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addOption}
                    className="w-full"
                  >
                    Seçenek Ekle
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Oluşturuluyor..." : "Anketi Oluştur"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {polls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <CardTitle>{poll.question}</CardTitle>
              <CardDescription>
                {poll.totalVotes} oy • Bitiş:{" "}
                {new Date(poll.endsAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {poll.options.map((option, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>{option}</span>
                    <span className="text-muted-foreground">
                      {poll.votePercentages[index]}%
                    </span>
                  </div>
                  <Progress value={poll.votePercentages[index]} />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {session?.user ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
                  {poll.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleVote(poll.id, index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <Link href="/auth/signin" className="w-full">
                  <Button className="w-full">Oy vermek için giriş yap</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}

        {polls.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Bu film için henüz anket oluşturulmamış.
              {session?.user ? (
                <p className="mt-2">İlk anketi siz oluşturun!</p>
              ) : (
                <p className="mt-2">
                  Anket oluşturmak için{" "}
                  <Link href="/auth/signin" className="underline">
                    giriş yapın
                  </Link>
                  .
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
