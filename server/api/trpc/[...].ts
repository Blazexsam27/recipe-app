import { initTRPC, TRPCError } from "@trpc/server";
import type { H3Event } from "h3";

/**
 * Create the tRPC context for each request.
 */
export const createTRPCContext = async (event: H3Event) => {
  return {
    event,
    auth: event.context.auth,
  };
};

/**
 * Initialize tRPC.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      message: error.message,
    };
  },
});

/**
 * Reusable helpers to define routers and procedures.
 */
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
