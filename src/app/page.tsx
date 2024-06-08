import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    
    <div>
      <h1>hello</h1>
    </div>
  );
}
