export const useRecipeById = async (id: number) => {
  const { $trpc } = useNuxtApp();

  try {
    const recipe = await $trpc.recipes.getRecipeById.query({ id });

    return { recipe, error: null };
  } catch (error) {
    return { recipe: null, error };
  }
};
