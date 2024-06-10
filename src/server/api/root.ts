import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { categoryRouter } from "@/server/api/routers/category";
export const appRouter = createTRPCRouter({
  category: categoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
