import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Smile, Frown, Zap, Coffee, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const moods = [
  {
    id: "happy",
    title: "Mutlu",
    description: "Keyifli ve eğlenceli filmler",
    icon: Smile,
    color: "text-yellow-500",
  },
  {
    id: "sad",
    title: "Duygusal",
    description: "Hislerinize tercüman olacak filmler",
    icon: Frown,
    color: "text-blue-500",
  },
  {
    id: "excited",
    title: "Heyecanlı",
    description: "Adrenalin dolu macera filmleri",
    icon: Zap,
    color: "text-red-500",
  },
  {
    id: "relaxed",
    title: "Rahatlatıcı",
    description: "Sakin ve huzurlu filmler",
    icon: Coffee,
    color: "text-green-500",
  },
];

export default function RecommendationsPage() {
  return (
    <Layout>
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Ruh Halinize Göre Filmler
            </h1>
            <p className="text-xl text-muted-foreground">
              Şu anki ruh halinize uygun film önerileri için bir duygu seçin
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <Link key={mood.id} href={`/recommendations/${mood.id}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                    <CardHeader>
                      <Icon className={`w-8 h-8 ${mood.color}`} />
                      <CardTitle className="text-2xl">{mood.title}</CardTitle>
                      <CardDescription>{mood.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full group">
                        Önerileri Gör
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}
