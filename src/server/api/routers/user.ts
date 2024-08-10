import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
export const userRouter = createTRPCRouter({
  getOne: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({ where: { id: ctx.session.user.id } });
  }),
  updateName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name },
      });
    }),
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.user.delete({ where: { id: ctx.session.user.id } });
  }),
  deleteAllData: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    await ctx.db.transaction.deleteMany({ where: { userId } });
    await ctx.db.category.deleteMany({ where: { userId } });
    await ctx.db.budget.deleteMany({ where: { id: userId } });

    return { success: true };
  }),
});
