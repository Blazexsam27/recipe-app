import type { TRPCClient } from "@trpc/client";
import type { AppRouter } from "~/server/api/trpc/_app";

declare module "#app" {
  interface NuxtApp {
    $trpc: TRPCClient<AppRouter>;
  }
}

export {};
