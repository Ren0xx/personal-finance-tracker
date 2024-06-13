import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { budgetRouter } from "@/server/api/routers/budget";
import { categoryRouter } from "@/server/api/routers/category";
import { transactionRouter } from "@/server/api/routers/transaction";
import { savingsGoalRouter } from "@/server/api/routers/savingsGoal";
export const appRouter = createTRPCRouter({
  budget: budgetRouter,
  category: categoryRouter,
  savingsGoal: savingsGoalRouter,
  transaction: transactionRouter,
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
