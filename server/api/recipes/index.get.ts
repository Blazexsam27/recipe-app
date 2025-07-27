import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);

  const { data, error } = await supabase.from("recipes").select("*");

  if (error) {
    throw createError({
      statusCode: 500,
      message: "Error while getting recipes from DB",
    });
  }

  return data;
});
