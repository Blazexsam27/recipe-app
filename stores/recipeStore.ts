import { defineStore } from "pinia";
import type { Recipe } from "~/types/recipe";

export const useRecipeStore = defineStore("recipe", () => {
  const recipes = ref<Recipe[]>([]);
  const selectedRecipe = ref<Recipe | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchRecipe() {
    loading.value = true;
    error.value = null;
    try {
      const { recipes: allRecipes } = await useRecipe();
      recipes.value = allRecipes || [];
    } catch (error: any) {
      error.value = error.message || "Failed to fetch the recipes";
    } finally {
      loading.value = false;
    }
  }

  async function fetchRecipeById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      const { recipe } = await useRecipeById(id);
      selectedRecipe.value = recipe;
    } catch (error: any) {
      error.value = error.message || "Failed to fetch the recipes";
    } finally {
      loading.value = false;
    }
  }

  async function createRecipe(body: Recipe) {
    loading.value = true;
    error.value = null;

    try {
      const { recipe } = await useRecipeCreate(body);
      recipes.value.push(recipe);
    } catch (error: any) {
      error.value = error.message || "Failed to create recipe";
    } finally {
      loading.value = false;
    }
  }

  async function updateRecipe(id: number, body: Partial<Recipe>) {
    loading.value = true;
    error.value = null;

    try {
      const { recipe } = await useRecipeUpdate(id, body);
      selectedRecipe.value = recipe.value;
    } catch (error: any) {
      error.value = error.message || "Failed the update the recipe";
    } finally {
      loading.value = false;
    }
  }

  async function deleteRecipe(id: number) {
    loading.value = false;
    error.value = null;
    try {
      await useRecipeDelete(id);
      recipes.value = recipes.value.filter((recipe) => recipe.id !== id);
    } catch (error: any) {
      error.value = error.message || "Failed the update the recipe";
    } finally {
      loading.value = false;
    }
  }

  return {
    recipes,
    selectedRecipe,
    loading,
    error,
    fetchRecipe,
    fetchRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
});
