import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div>
      <ThemeToggle />
      <h1>hello</h1>
    </div>
  );
}
