"use client";
import Link from "next/link";
import { hrefs } from "@/utils/navigation";
import { H4 } from "@/components/ui/typography";
import { useTour } from "@reactour/tour";
import useTourStatus from "@/hooks/useTourStatus";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
const SideNav = () => {
  const { tourCompleted } = useTourStatus();
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (!tourCompleted) setIsOpen(true);
  }, [tourCompleted, setIsOpen]);

  return (
    <nav className="mt-8 flex flex-col gap-8 overflow-hidden text-ellipsis whitespace-nowrap">
      {hrefs.map(({ name, href, icon, id }) => (
        <Link
          key={name}
          href={href}
          className="flex items-center gap-2"
          id={id}
        >
          <span className="text-2xl">{icon}</span>
          <H4>{name}</H4>
        </Link>
      ))}
      <Button size='sm' onClick={() => setIsOpen(true)}>Open Tour</Button>
    </nav>
  );
};

export default SideNav;
