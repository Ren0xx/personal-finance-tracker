import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
export const budgetRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        categoryId: z.string(),
        amount: z.number(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.budget.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.session.user.id,
          categoryId: input.categoryId,
          amount: input.amount,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.budget.delete({ where: { id: input.id } });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.budget.findMany({
      where: { userId: ctx.session.user.id },
      include: { categories: true },
    });
  }),
  getOne: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.budget.findFirst({
        where: { name: input.name, userId: ctx.session.user.id },
        include: { categories: true },
      });
    }),
});
