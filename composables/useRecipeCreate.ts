import type { Recipe } from "~/types/recipe";

export const useRecipeCreate = async (body: Recipe) => {
  const { $trpc } = useNuxtApp();

  try {
    const recipe = await $trpc.recipes.createRecipe.mutate(body);
    return {
      recipe,
      error: null,
    };
  } catch (error) {
    return {
      recipe: null,
      error,
    };
  }
};
