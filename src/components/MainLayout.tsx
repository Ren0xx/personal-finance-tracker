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
import Footer from "@/components/Footer";

import TourWrapper from "@/components/Wrappers/TourWrapper";
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
        <TourWrapper>
          <div className="mb-16 mt-6 grid min-h-dvh grid-cols-1 gap-4 md:mb-0  md:grid-cols-6">
            {!isMobile && <MemoizedSideNav />}
            <main className="col-span-1 mb-auto md:col-span-5">{children}</main>
            <Footer />
            {isMobile && <MemoizedBottomNav />}
          </div>
          <Toaster />
        </TourWrapper>
      )}
    </div>
  );
}
