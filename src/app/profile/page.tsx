import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import { Layout } from "@/components/layout/Layout";

// Tip tanımlamaları
interface Review {
  id: string;
  rating: number;
}

interface Movie {
  id: string;
  tmdbId: number;
  title: string;
  posterPath: string | null;
  releaseDate: Date | null;
  voteAverage: number | null;
  overview: string | null;
}

interface Follower {
  id: string;
  name: string | null;
  image: string | null;
}

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      followers: true,
      following: true,
      watchlist: true,
      watched: true,
      reviews: true,
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || ""}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-4xl">
                    {user.name?.[0] || "?"}
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <div className="font-semibold">{user.followers.length}</div>
                    <div className="text-sm text-muted-foreground">Takipçi</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{user.following.length}</div>
                    <div className="text-sm text-muted-foreground">
                      Takip Edilen
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📺</span> İzlenen Filmler
                </CardTitle>
                <CardDescription>Toplam izlenen film sayısı</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{user.watched.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📋</span> İzleme Listesi
                </CardTitle>
                <CardDescription>İzlenecek film sayısı</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{user.watchlist.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>⭐</span> Ortalama Puan
                </CardTitle>
                <CardDescription>
                  İzlenen filmlerin ortalama puanı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {user.reviews.length > 0
                    ? (
                        user.reviews.reduce(
                          (acc: number, rev: Review) => acc + rev.rating,
                          0
                        ) / user.reviews.length
                      ).toFixed(1)
                    : "-"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Film Listeleri */}
          <Tabs defaultValue="watchlist" className="space-y-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="watchlist">İzleyeceğim</TabsTrigger>
              <TabsTrigger value="watched">İzlediklerim</TabsTrigger>
              <TabsTrigger value="followers">Takipçiler</TabsTrigger>
              <TabsTrigger value="following">Takip Edilenler</TabsTrigger>
            </TabsList>

            <TabsContent value="watchlist">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {user.watchlist.length === 0 ? (
                  <div className="col-span-full">
                    <Card className="p-8 text-center">
                      <CardTitle className="mb-2">
                        İzleme Listeniz Boş
                      </CardTitle>
                      <CardDescription className="mb-4">
                        İzlemek istediğiniz filmleri listenize ekleyin
                      </CardDescription>
                      <Link href="/search">
                        <Button>Film Ara</Button>
                      </Link>
                    </Card>
                  </div>
                ) : (
                  user.watchlist.map((movie: Movie) => (
                    <div key={movie.id}>
                      <MovieCard
                        movie={{
                          id: movie.tmdbId,
                          title: movie.title,
                          poster_path: movie.posterPath,
                          release_date: movie.releaseDate?.toISOString() || "",
                          vote_average: movie.voteAverage || 0,
                          overview: movie.overview || "",
                          genre_ids: [],
                          backdrop_path: null,
                        }}
                      />
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="watched">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {user.watched.length === 0 ? (
                  <div className="col-span-full">
                    <Card className="p-8 text-center">
                      <CardTitle className="mb-2">
                        İzlediğiniz Film Bulunmuyor
                      </CardTitle>
                      <CardDescription className="mb-4">
                        İzlediğiniz filmleri işaretleyin
                      </CardDescription>
                      <Link href="/search">
                        <Button>Film Ara</Button>
                      </Link>
                    </Card>
                  </div>
                ) : (
                  user.watched.map((movie: Movie) => (
                    <div key={movie.id}>
                      <MovieCard
                        movie={{
                          id: movie.tmdbId,
                          title: movie.title,
                          poster_path: movie.posterPath,
                          release_date: movie.releaseDate?.toISOString() || "",
                          vote_average: movie.voteAverage || 0,
                          overview: movie.overview || "",
                          genre_ids: [],
                          backdrop_path: null,
                        }}
                      />
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="followers">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {user.followers.length === 0 ? (
                  <div className="col-span-full">
                    <Card className="p-8 text-center">
                      <CardTitle className="mb-2">Takipçiniz Yok</CardTitle>
                      <CardDescription>
                        Henüz kimse sizi takip etmiyor
                      </CardDescription>
                    </Card>
                  </div>
                ) : (
                  user.followers.map((follower: Follower) => (
                    <Card key={follower.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          {follower.image ? (
                            <Image
                              src={follower.image}
                              alt={follower.name || ""}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              {follower.name?.[0] || "?"}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{follower.name}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="following">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {user.following.length === 0 ? (
                  <div className="col-span-full">
                    <Card className="p-8 text-center">
                      <CardTitle className="mb-2">
                        Takip Ettiğiniz Kimse Yok
                      </CardTitle>
                      <CardDescription>
                        Diğer kullanıcıları takip edin
                      </CardDescription>
                    </Card>
                  </div>
                ) : (
                  user.following.map((following: Follower) => (
                    <Card key={following.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          {following.image ? (
                            <Image
                              src={following.image}
                              alt={following.name || ""}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              {following.name?.[0] || "?"}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{following.name}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </Layout>
  );
}
