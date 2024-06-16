"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteSavingsGoalSchema } from "@/schemas/savingsGoal";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { type z } from "zod";
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
import useSavingsGoals from "@/hooks/useSavingsGoals";

const RemoveSavingsGoalForm = () => {
  const { savingsGoals, refetchSavingsGoals, isRefetchingSavingsGoals } =
    useSavingsGoals();

  const deleteOne = api.savingsGoal.deleteOne.useMutation({
    onSuccess: () => refetchSavingsGoals(),
  });
  const removeOne = async (id: string) => {
    await deleteOne.mutateAsync({ id });
  };
  const form = useForm<z.infer<typeof deleteSavingsGoalSchema>>({
    resolver: zodResolver(deleteSavingsGoalSchema),
    defaultValues: {
      savingsGoalId: "",
    },
  });
  const [open, setOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedSavingsGoal, setSelectedSavingsGoal] = useState<string>(
    form.getValues().savingsGoalId,
  );

  function onSubmit(values: z.infer<typeof deleteSavingsGoalSchema>) {
    setSelectedSavingsGoal(values.savingsGoalId);
    setConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (selectedSavingsGoal) {
      void removeOne(selectedSavingsGoal);
    }
    setConfirmOpen(false);
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild disabled={isRefetchingSavingsGoals}>
          <Button>Delete Savings Goal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Savings Goal</DialogTitle>
            <DialogDescription>
              Please select the savings goal you want to delete.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="savingsGoalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Savings Goal</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a savings goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Savings Goals</SelectLabel>
                            {savingsGoals?.map((savingsGoal) => (
                              <SelectItem
                                key={savingsGoal.id}
                                value={savingsGoal.id}
                              >
                                {savingsGoal.name}
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
              <Button type="submit" disabled={isRefetchingSavingsGoals}>
                Delete
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this savings goal? This action
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

export default RemoveSavingsGoalForm;