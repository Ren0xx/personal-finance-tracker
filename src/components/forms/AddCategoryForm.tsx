"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/react";
type Category = RouterOutputs["category"]["getAll"][0];
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

const createFormSchema = (existingCategories: Category[]) =>
  z.object({
    name: z
      .string()
      .min(3, {
        message: "Name must have at least 3 characters.",
      })
      .refine(
        (name) =>
          !existingCategories.some(
            (category) => category.name.toLowerCase() === name.toLowerCase(),
          ),
        { message: "Category already exists." },
      ),
  });
type AddCategoryFormProps = {
  categories: Category[];
  isRefetching: boolean;
  refetch: () => void;
};
const AddCategoryForm = (props: AddCategoryFormProps) => {
  const { categories, isRefetching, refetch } = props;
  const [open, setOpen] = useState<boolean>(false);

  const createOne = api.category.createOne.useMutation({
    onSuccess: () => refetch(),
  });

  const formSchema = useMemo(() => createFormSchema(categories), [categories]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const addOne = async (name: string) => {
    await createOne.mutateAsync({ name });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    void addOne(values.name);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Please enter the name of the new category.
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
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isRefetching}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryForm;
