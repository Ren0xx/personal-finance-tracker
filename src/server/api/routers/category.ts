import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
export const categoryRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: { name: input.name, userId: ctx.session.user.id },
      });
    }),

  //   getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
  //     return ctx.prisma.message.findUnique({ where: { id: input.id }, include: { room: true, creator: true } });

  //   }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({ where: { id: input.id } });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({});
  }),
});