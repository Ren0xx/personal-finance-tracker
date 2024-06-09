"use client";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotLoggedIn from "@/components/NotLoggedIn";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (status === "unauthenticated") {
    return <NotLoggedIn />;
  }
  return (
    <div>
      <ThemeToggle />
      <h1>hello</h1>
      <Button onClick={() => signOut()}>Log out</Button>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
