import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/server/actions/delete";
const DeleteAccountForm = () => {
  return (
    <div>
      <form action={deleteAccount}>
        <Button variant="destructive">Delete Account</Button>
      </form>
    </div>
  );
};

export default DeleteAccountForm;
