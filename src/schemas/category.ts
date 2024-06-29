import { z } from "zod";
export const createCategorySchema = (existingCategoriesNames: Array<string>) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(3, {
        message: "Name must have at least 3 characters.",
      })
      .refine(
        (name) =>
          !existingCategoriesNames.some(
            (categoryName) => categoryName.toLowerCase() === name.toLowerCase(),
          ),
        { message: "Category already exists." },
      ),
  });
export const deleteCategorySchema = z.object({
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
});
