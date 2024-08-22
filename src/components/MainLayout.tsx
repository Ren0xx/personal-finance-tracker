"use client";
import { memo } from "react";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
const { theme } = resolveConfig(tailwindConfig);

import SideNav from "@/components/SideNav";
import BottomNav from "@/components/BottomNav";
import NotLoggedIn from "@/components/NotLoggedIn";

import { Toaster } from "@/components/ui/toaster";
import { useMediaQuery } from "usehooks-ts";

const MemoizedSideNav = memo(SideNav);
const MemoizedNotLoggedIn = memo(NotLoggedIn);
const MemoizedBottomNav = memo(BottomNav);

import type { Session } from "next-auth";

export default function MainLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const width = theme.screens.md;
  const isMobile = useMediaQuery(`(max-width: ${width})`);
  return (
    <div className="container">
      {!session ? (
        <MemoizedNotLoggedIn />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 mb-16 mt-6">
          {!isMobile && <MemoizedSideNav />}
          <main className={"col-span-1 md:col-span-5"}>{children}</main>
          {isMobile && <MemoizedBottomNav />}
          <Toaster />
        </div>
      )}
    </div>
  );
}