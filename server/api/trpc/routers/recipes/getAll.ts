import { z } from "zod";
import { serverSupabaseServiceRole } from "#supabase/server";
import { publicProcedure } from "../../[...]";

export const getRecipes = publicProcedure.query(async ({ ctx }) => {
  const supabase = serverSupabaseServiceRole(ctx.event);

  const { data, error } = await supabase.from("recipes").select("*");

  if (error)
    throw createError({ statusCode: 500, message: "Error fetching recipes" });

  return data;
});
