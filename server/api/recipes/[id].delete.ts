import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const id = event.context.params?.id;
  if (id) {
    await supabase.from("recipes").delete().eq("id", id).select("*");
  } else {
    throw createError({
      statusCode: 404,
      message: "No recipe with given id is found, please verify the Id",
    });
  }
});
