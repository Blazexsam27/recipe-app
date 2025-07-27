<script setup lang="ts">
const recipeStore = useRecipeStore();
await useAsyncData("recipes", () => recipeStore.fetchRecipe());
</script>

<template>
  <div class="h-max py-4">
    <h1 class="text-5xl text-center">Recipes</h1>

    <div class="flex flex-col gap-6 pt-8 w-full">
      <h2 class="text-red-500" v-if="recipeStore.error"></h2>
      <h2 class="py-2" v-else-if="recipeStore.loading">Loading...</h2>
      <div class="flex flex-wrap gap-6 justify-center" v-else>
        <template v-for="recipe in recipeStore.recipes" :key="recipe.id">
          <RecipeCard
            :name="recipe.name"
            :id="recipe.id"
            :image="recipe.image"
            :difficulty="recipe.difficulty"
            :rating="recipe.rating"
            :prep-time-minutes="recipe.prepTimeMinutes"
        /></template>
      </div>
    </div>
  </div>
</template>
