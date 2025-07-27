import { serverSupabaseServiceRole } from "#supabase/server";
import { Recipe } from "~/types/recipe";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const id = event.context.params?.id;
  const body = await readBody(event);

  if (!id) throw createError({ statusCode: 400, message: "Missing ID" });

  // Solution 1 (Type assertion)
  const { data, error } = await supabase
    .from("recipes")
    .update(body as never)
    .eq("id", id)
    .select("*");

  if (error) throw createError({ statusCode: 500, message: error.message });
  return data;
});
