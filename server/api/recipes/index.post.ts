import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const { data, error } = await supabase.from("recipes").insert(body).select();

  if (error)
    throw createError({ statusCode: 502, message: "Could not create recipe" });

  return data;
});
