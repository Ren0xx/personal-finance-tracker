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

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const savingsGoals = await ctx.db.savingsGoal.findMany({
      where: { userId: ctx.session.user.id },
    });
    const alreadyTakenNames = savingsGoals.map((goal) => goal.name);
    return { data: savingsGoals, alreadyTakenNames };
  }),
  getOne: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const goal = await ctx.db.savingsGoal.findFirst({
        where: { name: input.name, userId: ctx.session.user.id },
      });
      const goalsNames = await ctx.db.savingsGoal.findMany({
        where: { userId: ctx.session.user.id },
        select: { name: true },
      });
      const alreadyTakenNames = goalsNames.map((goal) => goal.name);
      return { ...goal, alreadyTakenNames };
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        targetAmount: z.number(),
        currentAmount: z.number().optional(),
        deadline: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.savingsGoal.update({
        where: { id: input.id },
        data: {
          name: input.name,
          targetAmount: input.targetAmount,
          currentAmount: input.currentAmount,
          deadline: input.deadline,
        },
      });
    }),
});
