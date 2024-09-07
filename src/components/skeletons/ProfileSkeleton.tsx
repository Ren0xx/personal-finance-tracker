import { Skeleton } from "@/components//ui/skeleton";
import { H1 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

const ProfileSkeleton = () => {
  return (
    <div className="flex grow flex-col gap-4 rounded-md bg-card p-4">
      <section className="col-span-1 flex flex-col gap-2 ">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full bg-accent-foreground" />
          <H1>...</H1>
        </div>
      </section>
      <ChangeNameSkeleton />
      <hr />
    </div>
  );
};
const ChangeNameSkeleton = () => {
  return (
    <section className="flex flex-col gap-10">
      <Skeleton className="h-10 w-full border border-solid border-secondary bg-background" />
      <Button disabled={true} className="self-start">
        Submit
      </Button>
    </section>
  );
};

export { ProfileSkeleton };
