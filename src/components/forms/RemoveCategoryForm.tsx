"use client";

import { type RouterOutputs } from "@/trpc/react";
type Category = RouterOutputs["category"]["getAll"][0];

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCategorySchema } from "@/schemas/category";
import { useForm } from "react-hook-form";
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

type RemoveCategoryProps = {
  categories: Category[];
};
import { deleteCategory } from "@/server/actions/delete";
import { useToast } from "@/components/ui/use-toast";
const RemoveCategoryForm = (props: RemoveCategoryProps) => {
  const { categories } = props;

  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const form = useForm<z.infer<typeof deleteCategorySchema>>({
    resolver: zodResolver(deleteCategorySchema),
    defaultValues: {
      categoryId: "",
    },
  });

  function onSubmit(values: z.infer<typeof deleteCategorySchema>) {
    setSelectedCategory(values.categoryId);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (selectedCategory) {
      await deleteCategory(selectedCategory);
    }
    setConfirmOpen(false);
    setOpen(false);
    toast({
      variant: "destructive",
      title: "Category deleted!",
      description: "Category deleted successfully.",
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Delete Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Please select the category you want to delete.
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
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
              <Button type="submit">Delete</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
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

export default RemoveCategoryForm;
