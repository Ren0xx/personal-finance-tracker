"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteBudgetSchema } from "@/schemas/budget";
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
import useBudgets from "@/hooks/GET/useBudgets";
import useDeleteBudget from "@/hooks/DELETE/useDeleteBudget";

const RemoveBudgetForm = () => {
  const { budgets, refetchBudgets, isRefetchingBudgets } = useBudgets();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const { removeBudget } = useDeleteBudget(refetchBudgets);

  const form = useForm<z.infer<typeof deleteBudgetSchema>>({
    resolver: zodResolver(deleteBudgetSchema),
    defaultValues: {
      budgetId: "",
    },
  });
  

  const [open, setOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<string>(
    form.getValues().budgetId,
  );

  function onSubmit(values: z.infer<typeof deleteBudgetSchema>) {
    setSelectedBudget(values.budgetId);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (selectedBudget) {
      await removeBudget(selectedBudget);
    }
    setConfirmOpen(false);
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild disabled={isRefetchingBudgets}>
          <Button>Delete Budget</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Budget</DialogTitle>
            <DialogDescription>
              Please select the budget you want to delete.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="budgetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Budgets</SelectLabel>
                            {budgets?.map((budget) => (
                              <SelectItem key={budget.id} value={budget.id}>
                                {budget.name}
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
              <Button type="submit" disabled={isRefetchingBudgets}>
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
              Are you sure you want to delete this budget? This action cannot be
              undone.
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

export default RemoveBudgetForm;
