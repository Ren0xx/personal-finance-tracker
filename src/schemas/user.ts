import { z } from "zod";
export const updateUsernameSchema = z.object({
  name: z.string().min(5, {
    message: "Name is required.",
  }),
});
