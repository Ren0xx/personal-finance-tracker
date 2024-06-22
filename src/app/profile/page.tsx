import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import ProfileAvatar from "./_components/Avatar";
export default async function Profile() {
  const res = await api.user.getOne();
  return (
    <>
      <H1>Profile</H1>
      <div>
        <pre>{JSON.stringify(res, null, 2)}</pre>
      </div>
      <ProfileAvatar
        src={res?.image ?? "https://github.com/shadcn.png"}
        fallback={res?.name ?? "Not Found"}
      />
    </>
  );
}
