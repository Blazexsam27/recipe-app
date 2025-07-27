<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();
const id = Number(route.params.id);

const recipeStore = useRecipeStore();
const { selectedRecipe } = storeToRefs(recipeStore);
const { pending, error } = await useAsyncData("selectedRecipe", () =>
  recipeStore.fetchRecipeById(id)
);

const labels = ["Easy", "Medium", "Hard", "Expert"];

const computedDifficulty = (label: string) => {
  let index = labels.findIndex((x) => x === label);
  if (index) return index + 1;
};
</script>
<template>
  <div class="h-screen p-4">
    <h1 class="text-3xl text-center">Your Recipe</h1>
    <h2 class="text-red-500" v-if="error">Error while getting your recipe</h2>
    <h2 class="text-green-500" v-else-if="pending">Loading Recipe ...</h2>

    <div class="flex justify-around h-max pt-12" v-else-if="selectedRecipe">
      <div class="w-1/3">
        <img :src="selectedRecipe.image" alt="" class="rounded-lg shadow-md" />
      </div>
      <div class="w-1/3">
        <h1 class="text-3xl font-semibold">
          {{ selectedRecipe.name }}
        </h1>

        <p class="pt-5">
          Difficulty:
          <span
            v-for="x in computedDifficulty(selectedRecipe.difficulty)"
            :key="x"
          >
            <Icon name="solar:star-bold" class="text-yellow-400"
          /></span>
          ({{ selectedRecipe.difficulty }})
        </p>
        <p class="pt-5">
          Prep Time: {{ selectedRecipe.prepTimeMinutes }} minutes
        </p>
      </div>
    </div>

    <!-- fallback for "no recipe found" if needed -->
    <div v-else>
      <h2 class="text-gray-500">Recipe not found.</h2>
    </div>
  </div>
</template>
