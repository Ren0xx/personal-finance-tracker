import { api } from "@/trpc/server";
import UpdateNameForm from "./_components/UpdateNameForm";
import ProfileShowcase from "./_components/ProfileShowcase";
import DeleteAccountForm from "./_components/DeleteAccountForm";
export default async function Profile() {
  const user = await api.user.getOne();
  if (!user) {
    return <>Error</>;
  }
  return (
    <>
      <ProfileShowcase name={user.name} image={user.image} />
      <UpdateNameForm currentUserName={user.name ?? ""} />
      <DeleteAccountForm />
    </>
  );
}
