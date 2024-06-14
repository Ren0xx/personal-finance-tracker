import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import SessionWrapper from "@/components/SessionWrapper";
import SideNav from "@/components/SideNav";
import { getServerAuthSession } from "@/server/auth";
import NotLoggedIn from "@/components/NotLoggedIn";
export const metadata = {
  title: "Finance Tracker",
  description: "Your best finance tracker app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSession = await getServerAuthSession();
  return (
    <SessionWrapper>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className="container">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              {!authSession ? (
                <>
                  <NotLoggedIn />
                </>
              ) : (
                <div className="min-h-screen min-w-full">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-1">
                      <SideNav />
                    </div>
                    <div className="col-span-5">{children}</div>
                  </div>
                </div>
              )}
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
