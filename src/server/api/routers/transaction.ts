import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
export const transactionRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        categoryId: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction.create({
        data: {
          userId: ctx.session.user.id,
          categoryId: input.categoryId,
          description: input.description ?? null,
          amount: input.amount,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction.delete({ where: { id: input.id } });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id },
      include: { category: true },
    });
  }),
});
