import { api } from "@/trpc/server";
import UpdateNameForm from "./_components/UpdateNameForm";
import ProfileShowcase from "./_components/ProfileShowcase";
import { notFound } from "next/navigation";
import { H2 } from "@/components/ui/typography";
import DeleteWithConfirmForm from "@/components/forms/DeleteWithConfirmForm";
import { deleteAccount, deleteAllUserData } from "@/server/actions/delete";

export default async function Profile() {
  const user = await api.user.getOne();
  if (!user) {
    return notFound();
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <section className="col-span-1">
        <ProfileShowcase name={user.name} image={user.image} />
        <UpdateNameForm currentUserName={user.name ?? ""} />
      </section>

      <section className="col-span-1 flex flex-col gap-2 ">
        <H2> Dangerous Section</H2>
        <DeleteWithConfirmForm action={deleteAccount} title="Account" />
        <DeleteWithConfirmForm action={deleteAllUserData} title="All data" />
      </section>
    </div>
  );
}
