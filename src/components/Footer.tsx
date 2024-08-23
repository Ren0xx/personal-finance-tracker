import { siteConfig } from "@/config/site";
import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="py-2 md:px-4 md:py-0 md:col-start-3 md:col-end-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href={siteConfig.links.personalWebsite}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Ren0xx
          </Link>
          . The source code is available on{" "}
          <Link
            href={siteConfig.links.repository}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          . See my other {" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
           projects
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
