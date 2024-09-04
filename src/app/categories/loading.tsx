import { CategoriesSkeleton } from "@/components/skeletons/CategoriesSkeleton";
import { H1 } from "@/components/ui/typography";

export default function Loading() {
  return (
    <div className="text-center">
      <H1 className="mb-8">Categories</H1>
      <CategoriesSkeleton />
    </div>
  );
}
