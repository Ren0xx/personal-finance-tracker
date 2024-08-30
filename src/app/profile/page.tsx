import { api } from "@/trpc/server";
import UpdateNameForm from "./_components/UpdateNameForm";
import ProfileShowcase from "./_components/ProfileShowcase";
import { notFound } from "next/navigation";
import { H2 } from "@/components/ui/typography";
import DeleteWithConfirmForm from "@/components/forms/DeleteWithConfirmForm";
import { deleteAccount, deleteAllUserData } from "@/server/actions/delete";
import LogOutButton from "@/components/LogOut";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BasicPageTransition } from "@/components/Animations/PageTransitions";

export default async function Profile() {
  const user = await api.user.getOne();
  if (!user) {
    return notFound();
  }
  return (
    <BasicPageTransition className=" flex grow flex-col gap-4 rounded-md bg-card p-4">
      <section className="col-span-1 flex flex-col gap-2 ">
        <ProfileShowcase name={user.name} image={user.image} />
        <UpdateNameForm currentUserName={user.name ?? ""} />
        <hr />
      </section>

      <section className="col-span-1 flex grow flex-col items-center gap-2">
        <ThemeToggle />
        <H2> Dangerous Section</H2>
        <DeleteWithConfirmForm action={deleteAccount} title="Account" />
        <DeleteWithConfirmForm action={deleteAllUserData} title="All data" />
        <hr />
        <LogOutButton />
      </section>
    </BasicPageTransition>
  );
}
