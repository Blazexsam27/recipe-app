export const useRecipe = async () => {
  const { $trpc } = useNuxtApp();

  try {
    const recipes = await $trpc.recipes.getRecipes.query();

    return { recipes, error: null };
  } catch (error) {
    return { recipes: null, error };
  }
};
