import { serverSupabaseServiceRole } from "#supabase/server";
import { publicProcedure } from "../../[...]";
import { z } from "zod";

export const getRecipeById = publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ input, ctx }) => {
    const supabase = serverSupabaseServiceRole(ctx.event);

    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", input.id)
      .single();

    if (error)
      throw createError({
        statusCode: 500,
        message: "Error while getting recipe",
      });

    return data;
  });
