"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteSavingsGoalSchema } from "@/schemas/savingsGoal";

import { type RouterOutputs } from "@/trpc/react";
type SavingsGoal = RouterOutputs["savingsGoal"]["getAll"][0];

import { useForm, useFormState } from "react-hook-form";
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
import { deleteSavingsGoal } from "@/server/actions/delete";
import { useToast } from "@/components/ui/use-toast";

type SavingsGoalsProps = {
  savingsGoals: SavingsGoal[];
};

const RemoveSavingsGoalForm = (props: SavingsGoalsProps) => {
  const { savingsGoals } = props;

  const form = useForm<z.infer<typeof deleteSavingsGoalSchema>>({
    resolver: zodResolver(deleteSavingsGoalSchema),
    defaultValues: {
      savingsGoalId: "",
    },
  });
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedSavingsGoal, setSelectedSavingsGoal] = useState<string>(
    form.getValues().savingsGoalId,
  );

  const { isSubmitting } = useFormState({ control: form.control });
  function onSubmit(values: z.infer<typeof deleteSavingsGoalSchema>) {
    setSelectedSavingsGoal(values.savingsGoalId);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (selectedSavingsGoal) {
      await deleteSavingsGoal(selectedSavingsGoal);
    }
    setConfirmOpen(false);
    setOpen(false);
    toast({
      variant: "destructive",
      title: "Savings goal deleted!",
      description: "Savings goal deleted successfully.",
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
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
              <Button
                type="submit"
                variant="destructive"
                disabled={isSubmitting}
              >
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
