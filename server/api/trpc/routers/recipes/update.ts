import { publicProcedure } from "../../[...]";
import { serverSupabaseServiceRole } from "#supabase/server";
import { z } from "zod";

export const updateRecipe = publicProcedure
  .input(
    z.object({
      id: z.number(),
      name: z.string().optional(),
      difficulty: z.string().optional(),
      prepTimeMinutes: z.number().optional(),
      image: z.string().optional(),
      rating: z.number().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { id, ...updateRecipe } = input;
    const supabase = serverSupabaseServiceRole(ctx.event);
    const { data, error } = await supabase
      .from("recipes")
      .update(updateRecipe as never)
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw createError({
        statusCode: 500,
        message: "Error while getting recipe",
      });

    return data;
  });
