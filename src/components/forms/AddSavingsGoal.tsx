"use client";

import { type z } from "zod";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { DatePicker } from "@/components/DatePickers/DatePicker";

import useSavingsGoals from "@/hooks/GET/useSavingsGoals";
import useAddSavingsGoal from "@/hooks/POST/useAddSavingsGoal";

const AddSavingGoal = () => {
  const [open, setOpen] = useState(false);
  const { savingsGoals, refetchSavingsGoals, isRefetchingSavingsGoals } =
    useSavingsGoals();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { addSavingsGoal } = useAddSavingsGoal(refetchSavingsGoals);
  const formSchema = useMemo(
    () => createSavingsGoalSchema(savingsGoals!),
    [savingsGoals],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      targetAmount: "100",
      deadline: undefined,
      currentAmount: "0",
    },
  });
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, targetAmount, deadline, currentAmount } = values;
    await addSavingsGoal(
      name,
      parseFloat(targetAmount),
      deadline,
      currentAmount ? parseFloat(currentAmount) : undefined,
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Savings Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Savings Goal</DialogTitle>
          <DialogDescription>
            Please enter the details of the new savings goal.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <FormLabel>Start Date</FormLabel>
                  <DatePicker date={field.value} onChange={field.onChange} />

                  <FormDescription>Select the deadline date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isRefetchingSavingsGoals}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSavingGoal;
