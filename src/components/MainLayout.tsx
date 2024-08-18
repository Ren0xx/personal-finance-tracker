"use client";
import { memo } from "react";

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
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="container my-4">
      {!session ? (
        <MemoizedNotLoggedIn />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {!isMobile && <MemoizedSideNav />}
          <main className={"col-span-1 md:col-span-5"}>{children}</main>
          {isMobile && <MemoizedBottomNav />}
          <Toaster />
        </div>
      )}
    </div>
  );
}
