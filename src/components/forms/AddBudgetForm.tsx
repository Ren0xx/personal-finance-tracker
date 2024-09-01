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
import { AnimatedFormOpen } from "@/components/Animations/FormAnimation";

import { type z } from "zod";
import { type RouterOutputs } from "@/trpc/react";
type Category = RouterOutputs["category"]["getAll"][0];

import { createBudget } from "@/server/actions/create";
import { useToast } from "@/components/ui/use-toast";

type AddBudgetFormProps = {
  categories: Category[];
  budgetsNames: Array<string>;
};
const AddBudgetForm = (props: AddBudgetFormProps) => {
  const { categories, budgetsNames } = props;
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const formSchema = useMemo(
    () => createBudgetSchema(budgetsNames),
    [budgetsNames],
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      amount: "100",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
  });
  const { isSubmitting } = useFormState({ control: form.control });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createBudget({
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
      title: "Budget created!",
      description: "Budget created successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Budget</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Please enter the details of the new budget.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <AnimatedFormOpen
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
              Create Budget
            </Button>
          </AnimatedFormOpen>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetForm;
