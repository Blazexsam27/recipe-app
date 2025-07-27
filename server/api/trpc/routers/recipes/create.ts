import { publicProcedure } from "../../[...]";
import { z } from "zod";
import { serverSupabaseServiceRole } from "#supabase/server";

export const createRecipe = publicProcedure
  .input(
    z.object({
      name: z.string(),
      difficulty: z.string(),
      prepTimeMinutes: z.number(),
      image: z.string(),
      rating: z.number(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const supabase = serverSupabaseServiceRole(ctx.event);
    const { data, error } = await supabase
      .from("recipes")
      .insert(input as any)
      .select();

    if (error)
      throw createError({
        statusCode: 500,
        message: "Error creating recipe",
      });

    return data;
  });
