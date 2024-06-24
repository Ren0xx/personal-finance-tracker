import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import ProfileAvatar from "./_components/Avatar";
import UpdateNameForm from "./_components/UpdateNameForm";
export default async function Profile() {
  const res = await api.user.getOne();
  return (
    <>
      <H1>Profile</H1>
      <div></div>
      <ProfileAvatar
        src={res?.image ?? "https://github.com/shadcn.png"}
        fallback={res?.name ?? "Not Found"}
      />
      <div>
        <H1>{res?.name}</H1>
      </div>
      <UpdateNameForm />
    </>
  );
}
