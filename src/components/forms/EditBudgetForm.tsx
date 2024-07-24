"use client";

import { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { createBudgetSchema } from "@/schemas/budget";
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
import { DatePickerWithRange } from "@/components/datepickers/DatePickerWithRange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type z } from "zod";
import { type RouterOutputs } from "@/trpc/react";
type Budget = RouterOutputs["budget"]["getOne"];
type Category = RouterOutputs["category"]["getAll"][0];

import { updateBudget } from "@/server/actions/update";
import { useToast } from "@/components/ui/use-toast";

type AddBudgetFormProps = {
  categories: Category[];
  budget: Budget;
};
const EditBudgetForm = ({ budget, categories }: AddBudgetFormProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const alreadyTakenNames = budget.alreadyTakenNames.filter(
    (name) => name !== budget.name,
  );

  const formSchema = useMemo(
    () => createBudgetSchema(alreadyTakenNames),
    [alreadyTakenNames],
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: budget.name,
      description: budget?.description ?? "",
      categoryId: budget.categoryId,
      amount: budget.amount ? budget.amount.toString() : "",
      dateRange: {
        from: budget.startDate,
        to: budget.endDate,
      },
    },
  });
  const { isSubmitting } = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateBudget({
      id: budget.id!, 
      name: values.name,
      amount: parseFloat(values.amount),
      description: values.description,
      categoryId: values.categoryId,
      startDate: values.dateRange.from,
      endDate: values.dateRange.to,
    });
    setOpen(false);
    toast({
      variant: "success",
      title: "Budget updated!",
      description: "Budget updated successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Budget</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Please enter the details of the budget.
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
                    <Input placeholder="Budget name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start and End Date</FormLabel>

                  <DatePickerWithRange
                    from={field.value.from}
                    to={field.value.to}
                    onChange={field.onChange}
                  />
                  <FormDescription>
                    Select the start and end date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Update Budget
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetForm;
