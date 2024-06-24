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
  
});
