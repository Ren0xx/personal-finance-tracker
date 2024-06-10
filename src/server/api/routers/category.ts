import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
export const categoryRouter = createTRPCRouter({
  //   createOne: protectedProcedure
  //     .input(z.object({ content: z.string(), roomId: z.string() }))
  //     .mutation(async ({ ctx, input }) => {
  //       return ctx.prisma.message.create({
  //         data: {
  //           content: input.content,
  //           roomId: input.roomId,
  //           creatorId: ctx.session.user.id,
  //           creatorName: ctx.session.user.name,
  //           creatorImage: ctx.session.user.image,
  //         },
  //       });
  //     }),
  //   getOne: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
  //     return ctx.prisma.message.findUnique({ where: { id: input.id }, include: { room: true, creator: true } });

  //   }),
  //   deleteOne: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {

  //     return ctx.prisma.message.delete({ where: { id: input.id } });
  //   }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({});
  }),
  
});
