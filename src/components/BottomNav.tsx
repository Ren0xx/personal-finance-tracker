import Link from "next/link";
import { hrefs } from "@/utils/navigationData";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 mt-2 flex justify-around bg-background p-4 shadow-lg md:hidden">
      {hrefs.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex flex-col items-center"
        >
          <span className="h-6 w-6">{item.icon}</span>
          <span className="text-xs">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
