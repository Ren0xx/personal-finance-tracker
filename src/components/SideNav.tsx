"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { H4 } from "@/components/ui/typography";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const SideNav = () => {
  return (
    <div className="flex flex-col gap-4">
      <ThemeToggle />
      <Link href="/">
        <H4>Dashboard</H4>
      </Link>
      <Link href="/transactions">
        <H4>Transactions</H4>
      </Link>
      <Link href="/billings">
        <H4>Billings</H4>
      </Link>
      <Button onClick={() => signOut()}>Log out</Button>
    </div>
  );
};

export default SideNav;
