"use client";

import { updateName } from "@/server/actions/update";
import { updateUsernameSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
type UpdateNameFormProps = {
  currentUserName: string;
};
const UpdateNameForm = (props: UpdateNameFormProps) => {
  const { currentUserName } = props;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUsernameSchema>>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof updateUsernameSchema>) {
    if (currentUserName === values.name) return;
    await updateName(values.name);
    toast({
      variant: "success",
      title: "Username updated!",
      description: "Username updated successfully.",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your new name" {...field} />
              </FormControl>
              <FormDescription>Change your username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UpdateNameForm;
