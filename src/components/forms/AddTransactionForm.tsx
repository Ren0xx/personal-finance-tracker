"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/trpc/react";
import useTransactions from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCategories from "@/hooks/useCategories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid number with up to two decimal places.",
    })
    .min(1, { message: "Amount cannot be empty." })
    .max(10000000, { message: "Amount cannot be larger than 10 milion." }),
  description: z.string().optional(),
});

export function AddTransactionForm() {
  const {
    refetch: refetchTransactions,
    isRefetching: isRefetchingTransactions,
  } = useTransactions();
  const { categories } = useCategories();
  const createOne = api.transaction.createOne.useMutation({
    onSuccess: () => {
      void refetchTransactions();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      amount: "100",
      description: "",
    },
  });

  const addOne = async (
    amount: number,
    categoryId: string,
    description: string,
  ) => {
    await createOne.mutateAsync({
      amount,
      categoryId,
      description,
    });
  };
  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { amount, categoryId, description } = values;
    void addOne(parseFloat(amount), categoryId, description ?? "");
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Choose category</SelectLabel>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isRefetchingTransactions}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
