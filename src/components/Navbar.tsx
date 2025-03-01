import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-semibold text-lg">
            Film Öneri
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/recommendations"
              className="text-muted-foreground hover:text-foreground"
            >
              Öneriler
            </Link>
            <Link
              href="/search"
              className="text-muted-foreground hover:text-foreground"
            >
              Film Ara
            </Link>
            <Link
              href="/chat"
              className="text-muted-foreground hover:text-foreground"
            >
              AI Asistan
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
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
                      className="rounded-full"
                    />
                  ) : (
                    <span className="font-semibold">
                      {session.user.name?.[0] || "U"}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profilim</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/api/auth/signout">Çıkış Yap</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">Giriş Yap</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
