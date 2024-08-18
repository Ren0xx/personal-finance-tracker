"use client";
import Link from "next/link";
import { hrefs } from "@/utils/navigation";
import { H4 } from "@/components/ui/typography";

const SideNav = () => {
  return (
    <nav className="mt-8 flex flex-col gap-8 overflow-hidden text-ellipsis whitespace-nowrap">
      {hrefs.map(({ name, href, icon }) => (
        <Link key={name} href={href} className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <H4>{name}</H4>
        </Link>
      ))}
    </nav>
  );
};

export default SideNav;
