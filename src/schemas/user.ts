import { z } from "zod";
export const updateUsernameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Name is required.",
    })
    .max(32, {
      message: "Name must be less than 32 characters.",
    }),
});
