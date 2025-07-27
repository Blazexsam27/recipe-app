import { createTRPCRouter } from "./[...]";
import { recipesRouter } from "./routers/recipes";

export const appRouter = createTRPCRouter({
  recipes: recipesRouter,
});

export type AppRouter = typeof appRouter;
