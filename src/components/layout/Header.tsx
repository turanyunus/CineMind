import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Film,
  Search,
  Menu,
  Tv,
  Bot,
  Crown,
  ChevronDown,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export async function Header() {
  const session = await getServerSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-primary to-primary-foreground">
              CineMind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Film className="w-4 h-4" />
                  Filmler
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/movies/popular" className="w-full">
                    Popüler Filmler
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/movies/now-playing" className="w-full">
                    Vizyondakiler
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/movies/upcoming" className="w-full">
                    Yakında
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/movies/top-rated" className="w-full">
                    En İyi Filmler
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Tv className="w-4 h-4" />
                  Diziler
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/shows/popular" className="w-full">
                    Popüler Diziler
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shows/airing-today" className="w-full">
                    Bugün Yayınlananlar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shows/on-tv" className="w-full">
                    TV'de Olanlar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shows/top-rated" className="w-full">
                    En İyi Diziler
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/recommendations"
              className="text-sm hover:text-primary transition-colors cursor-pointer"
            >
              Öneriler
            </Link>

            <Link href="/chat">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                AI Asistan
              </Button>
            </Link>

            <Link href="/premium">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                Premium
              </Button>
            </Link>

            <Link href="/search">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Search className="w-5 h-5" />
              </Button>
            </Link>

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || ""}
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      Profilim
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout" className="w-full">
                      Çıkış Yap
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button className="cursor-pointer">Giriş Yap</Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold bg-clip-text bg-gradient-to-r from-primary to-primary-foreground">
                    CineMind
                  </span>
                </Link>

                <div className="space-y-3">
                  <div className="font-medium">Filmler</div>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/movies/popular"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      Popüler Filmler
                    </Link>
                    <Link
                      href="/movies/now-playing"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      Vizyondakiler
                    </Link>
                    <Link
                      href="/movies/upcoming"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      Yakında
                    </Link>
                    <Link
                      href="/movies/top-rated"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      En İyi Filmler
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="font-medium">Diziler</div>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/shows/popular"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      Popüler Diziler
                    </Link>
                    <Link
                      href="/shows/airing-today"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      Bugün Yayınlananlar
                    </Link>
                    <Link
                      href="/shows/on-tv"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      TV'de Olanlar
                    </Link>
                    <Link
                      href="/shows/top-rated"
                      className="block text-muted-foreground hover:text-foreground"
                    >
                      En İyi Diziler
                    </Link>
                  </div>
                </div>

                <Link
                  href="/recommendations"
                  className="font-medium hover:text-primary"
                >
                  Öneriler
                </Link>

                <Link href="/chat" className="font-medium hover:text-primary">
                  AI Asistan
                </Link>

                <Link
                  href="/premium"
                  className="font-medium hover:text-primary"
                >
                  Premium
                </Link>

                <Link href="/search" className="font-medium hover:text-primary">
                  Film Ara
                </Link>

                {session?.user ? (
                  <div className="space-y-3">
                    <div className="font-medium">Hesabım</div>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/profile"
                        className="block text-muted-foreground hover:text-foreground"
                      >
                        Profilim
                      </Link>
                      <Link
                        href="/api/auth/signout"
                        className="block text-muted-foreground hover:text-foreground"
                      >
                        Çıkış Yap
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link href="/auth/signin">
                    <Button className="w-full">Giriş Yap</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
