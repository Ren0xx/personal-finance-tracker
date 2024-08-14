"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { createTransactionSchema } from "@/schemas/transaction";
import { type RouterOutputs } from "@/trpc/react";
type Category = RouterOutputs["category"]["getAll"][0];
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTransaction } from "@/server/actions/create";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
type AddTransactionForm = {
  categories: Category[];
};
const AddTransactionForm = (props: AddTransactionForm) => {
  const { categories } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      categoryId: "",
      amount: "100",
      description: "",
    },
  });

  const { isSubmitting } = useFormState({ control: form.control });
  const onSubmit = async (values: z.infer<typeof createTransactionSchema>) => {
    const { amount, categoryId, description } = values;
    await createTransaction({
      categoryId,
      amount: parseFloat(amount),
      description,
    });
    setOpen(false);
    toast({
      variant: "success",
      title: "Transaction created!",
      description: "Transaction created successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="max-w-48 self-center px-8 py-6">
          Add New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account
          </DialogDescription>
        </DialogHeader>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Choose category</SelectLabel>
                          {categories?.length ? (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <Button asChild variant="link">
                              <Link href="/categories">Don&apos;t see any? Create new one!</Link>
                            </Button>
                          )}
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

            <Button type="submit" disabled={isSubmitting}>
              Create Transaction
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddTransactionForm;
