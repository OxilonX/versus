"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
//local comps imports
import NavAvatar from "./NavAvatar";
import { ThemeToggle } from "./ThemeToggle";
const navElements = [
  { id: 1, content: "home", href: "/" },
  { id: 2, content: "arena", href: "/arena" },
  { id: 3, content: "create", href: "/create" },
];

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  return (
    <header className="bg-background  container mx-auto max-w-275 px-4 sticky   py-3  flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src="/icons/versus_logo_final_small_2.svg"
          alt="Versus Logo"
          width={50}
          height={50}
          priority
          className="h-auto mt-0.5  dark:invert-100 cursor-pointer"
        />
      </Link>

      <nav className="flex items-center gap-8">
        <ul className="flex items-center gap-8">
          {navElements.map((el) => (
            <li key={el.id}>
              <Link
                href={el.href}
                className="text-muted-foreground text-sm hover:text-primary uppercase font-medium transition-colors"
              >
                {el.content}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="h-10 w-10 animate-pulse bg-muted rounded-full" />
          ) : session ? (
            <NavAvatar />
          ) : (
            <div className="flex gap-4">
              <Button
                className=" text-base "
                onClick={() => {
                  router.push("/login");
                }}
                variant="ghost"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  router.push("/signup");
                }}
                className="bg-primary text-base "
              >
                Sign Up
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
