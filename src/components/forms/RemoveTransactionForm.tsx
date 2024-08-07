"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTransactionSchema } from "@/schemas/transaction";
import { useForm, useFormState } from "react-hook-form";
import { type z } from "zod";
import { type RouterOutputs } from "@/trpc/react";
type Transaction = RouterOutputs["transaction"]["getAll"][0];
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteTransaction } from "@/server/actions/delete";
import { useToast } from "@/components/ui/use-toast";
type RemoveTransactionFormProps = {
  transactions: Transaction[];
};
const RemoveTransactionForm = (props: RemoveTransactionFormProps) => {
  const { transactions } = props;
  const form = useForm<z.infer<typeof deleteTransactionSchema>>({
    resolver: zodResolver(deleteTransactionSchema),
    defaultValues: {
      transactionId: "",
    },
  });

  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string>(
    form.getValues().transactionId,
  );

  const { isSubmitting } = useFormState({ control: form.control });
  function onSubmit(values: z.infer<typeof deleteTransactionSchema>) {
    setSelectedTransaction(values.transactionId);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (selectedTransaction) {
      await deleteTransaction(selectedTransaction);
    }
    setConfirmOpen(false);
    setOpen(false);
    toast({
      variant: "destructive",
      title: "Transaction deleted!",
      description: "Transaction deleted successfully.",
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Delete Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Please select the transaction you want to delete.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a transaction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Transactions</SelectLabel>
                            {transactions?.map((transaction) => (
                              <SelectItem
                                key={transaction.id}
                                value={transaction.id}
                              >
                                Transaction for amount:{" "}
                                {transaction.amount.toString()}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>Delete</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RemoveTransactionForm;
