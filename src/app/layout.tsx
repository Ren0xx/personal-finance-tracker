import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import SessionWrapper from "@/components/Wrappers/SessionWrapper";
import { getServerAuthSession } from "@/server/auth";
import MainLayout from "@/components/MainLayout";
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
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <MainLayout session={authSession}>{children}</MainLayout>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
