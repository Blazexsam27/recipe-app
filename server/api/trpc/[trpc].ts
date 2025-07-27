import { createTRPCNuxtHandler } from "trpc-nuxt/server";
import { appRouter } from "./_app";
import { createTRPCContext } from "./[...]";

export default createTRPCNuxtHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
