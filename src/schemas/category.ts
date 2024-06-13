import { z } from "zod";
import { type RouterOutputs } from "@/trpc/react";
type Category = RouterOutputs["category"]["getAll"][0];
export const createCategorySchema = (existingCategories: Category[]) =>
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
export const deleteCategorySchema = z.object({
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
});
