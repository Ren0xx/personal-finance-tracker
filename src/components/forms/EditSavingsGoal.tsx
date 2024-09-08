"use client";

import { type z } from "zod";
import { type RouterOutputs } from "@/trpc/react";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { createSavingsGoalSchema } from "@/schemas/savingsGoal";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnimatedFormOpen } from "@/components/Animations/FormAnimation";
import { DatePicker } from "../datepickers/DatePicker";
import { useToast } from "@/components/ui/use-toast";

import { updateSavingsGoal } from "@/server/actions/update";

type SavingsGoal = RouterOutputs["savingsGoal"]["getOne"];
type SavingsGoalsProps = {
  savingsGoal: SavingsGoal;
};
const EditSavingGoal = ({ savingsGoal }: SavingsGoalsProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const alreadyTakenNames = savingsGoal.alreadyTakenNames.filter(
    (name) => name !== savingsGoal.name,
  );

  const formSchema = useMemo(
    () => createSavingsGoalSchema(alreadyTakenNames),
    [alreadyTakenNames],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: savingsGoal?.name,
      targetAmount: savingsGoal?.targetAmount?.toString(),
      currentAmount: savingsGoal?.currentAmount?.toString(),
      deadline: savingsGoal?.deadline ?? new Date(),
    },
  });

  const { isSubmitting } = useFormState({ control: form.control });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, targetAmount, deadline, currentAmount } = values;
    await updateSavingsGoal({
      id: savingsGoal.id!, 
      name,
      targetAmount: parseFloat(targetAmount),
      deadline,
      currentAmount: currentAmount ? parseFloat(currentAmount) : undefined,
    });
    setOpen(false);
    toast({
      variant: "success",
      title: "Savings goal Updated!",
      description: "Savings goal updated successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-center">Edit Savings Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Savings Goal</DialogTitle>
          <DialogDescription>
            Please enter the details of the new savings goal.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <AnimatedFormOpen onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Savings goal name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Target amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Current Amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline Date</FormLabel>
                  <DatePicker date={field.value} onChange={field.onChange} />

                  <FormDescription>Select the deadline date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </AnimatedFormOpen>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSavingGoal;
