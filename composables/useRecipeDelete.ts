export const useRecipeDelete = async (id: number) => {
  const { $trpc } = useNuxtApp();

  try {
    await $trpc.recipes.deleteRecipe.mutate({ id });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};
