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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export default function SignInPage() {
  return (
    <Layout>
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-background to-primary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Hoş Geldiniz</CardTitle>
            <CardDescription>
              Hesabınıza giriş yapın veya yeni hesap oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Giriş Yap</TabsTrigger>
                <TabsTrigger value="signup">Kayıt Ol</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Şifre</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Giriş Yap
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input id="name" type="text" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">E-posta</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Şifre</Label>
                    <Input id="signup-password" type="password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Kayıt Ol
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  veya
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub ile Devam Et
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              <Link href="/auth/forgot-password" className="hover:underline">
                Şifremi Unuttum
              </Link>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              Premium üyelik avantajlarını görmek için{" "}
              <Link href="/premium" className="text-primary hover:underline">
                tıklayın
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </Layout>
  );
}
