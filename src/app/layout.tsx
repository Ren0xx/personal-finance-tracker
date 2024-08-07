import "@/styles/globals.css";
import { memo, cache } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import SessionWrapper from "@/components/SessionWrapper";
import SideNav from "@/components/SideNav";
import { getServerAuthSession } from "@/server/auth";
import NotLoggedIn from "@/components/NotLoggedIn";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "Finance Tracker",
  description: "Your best finance tracker app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const MemoizedSideNav = memo(SideNav);
const MemoizedNotLoggedIn = memo(NotLoggedIn);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSession = cache(async () => await getServerAuthSession());

  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <div className="container">
                {!authSession ? (
                  <>
                    <MemoizedNotLoggedIn />
                  </>
                ) : (
                  <div className="grid grid-cols-6 gap-4">
                    <MemoizedSideNav />
                    <main className="col-span-5">{children}</main>
                    <Toaster />
                  </div>
                )}
              </div>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
