import type { Recipe } from "~/types/recipe";

export const useRecipeUpdate = async (id: number, body: Partial<Recipe>) => {
  const { $trpc } = useNuxtApp();

  try {
    await $trpc.recipes.updateRecipe.mutate({ id, ...body });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};
