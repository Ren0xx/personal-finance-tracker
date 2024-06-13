import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
export const savingsGoalRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        targetAmount: z.number(),
        currentAmount: z.number().optional(),
        deadline: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.savingsGoal.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          targetAmount: input.targetAmount,
          currentAmount: input.currentAmount,
          deadline: input.deadline,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.savingsGoal.delete({ where: { id: input.id } });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.savingsGoal.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
});
