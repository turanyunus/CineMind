import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";

export default function ChatPage() {
  return (
    <Layout>
      <main className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Film Öneri Asistanı</CardTitle>
              <CardDescription>
                Ruh halinizi ve tercihlerinizi paylaşın, size en uygun filmleri
                önerelim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Örnek AI mesajı */}
                <div className="bg-muted p-4 rounded-lg">
                  <p>
                    Merhaba! Bugün nasıl hissediyorsunuz? Size uygun filmler
                    önerebilmem için biraz sohbet edelim.
                  </p>
                </div>

                {/* Örnek kullanıcı mesajı */}
                <div className="bg-primary/10 p-4 rounded-lg ml-8">
                  <p>
                    Bugün biraz hüzünlüyüm, duygusal bir film izlemek istiyorum.
                  </p>
                </div>

                {/* Örnek AI önerisi */}
                <div className="bg-muted p-4 rounded-lg">
                  <p>Anlıyorum. Size şu filmleri önerebilirim:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>The Notebook (2004)</li>
                    <li>A Star Is Born (2018)</li>
                    <li>Marriage Story (2019)</li>
                  </ul>
                  <p className="mt-2">
                    Bu filmlerden herhangi biri ilginizi çekiyor mu?
                  </p>
                </div>

                {/* Mesaj gönderme alanı */}
                <div className="flex gap-2">
                  <Input placeholder="Mesajınızı yazın..." className="flex-1" />
                  <Button>Gönder</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
