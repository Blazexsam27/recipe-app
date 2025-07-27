import { publicProcedure } from "../../[...]";
import { z } from "zod";
import { serverSupabaseServiceRole } from "#supabase/server";

export const deleteRecipe = publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input, ctx }) => {
    const supabase = serverSupabaseServiceRole(ctx.event);
    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", input.id);

    if (error)
      throw createError({
        statusCode: 500,
        message: "Error deleting recipe",
      });

    return { success: true };
  });
