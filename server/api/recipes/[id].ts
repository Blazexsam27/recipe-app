import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const id = event.context.params?.id;

  if (id) {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw createError({
        statusCode: 500,
        message: "Error while getting required recipe from server",
      });
    }

    return data;
  }
});
