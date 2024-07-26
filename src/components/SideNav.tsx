"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { H4 } from "@/components/ui/typography";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { hrefs } from "@/utils/navigation";
const SideNav = () => {
  return (
    <nav className="flex flex-row gap-2">
      <div className="col-span-1 flex flex-col gap-4 flex-1">
        <ThemeToggle />
        <div className="flex flex-col gap-8">
          {hrefs.map((href) => {
            return (
              <Link key={href.name} href={href.href} className="flex gap-2">
                {href.icon}
                <H4>{href.name}</H4>
              </Link>
            );
          })}
          <Button onClick={() => signOut()}>Log out</Button>
        </div>
      </div>
      <Separator orientation="vertical" className="flex-initial h-svh"/>
    </nav>
  );
};

export default SideNav;
