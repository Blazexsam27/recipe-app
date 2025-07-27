<script setup lang="ts">
import { ref, computed, reactive } from "vue";

// Define the Recipe type
export type Recipe = {
  id: number;
  name: string;
  image: string;
  rating: number;
  prepTimeMinutes: number;
  difficulty: number;
};

// Reactive form data
const recipe = reactive<Recipe>({
  id: 0,
  name: "",
  image: "",
  rating: 1,
  prepTimeMinutes: 30,
  difficulty: 1,
});

// Form state
const imageError = ref(false);
const showPreview = ref(false);

const recipeCreated = ref(false);

// Computed properties
const isFormValid = computed(() => {
  return (
    recipe.name.trim() !== "" &&
    recipe.image.trim() !== "" &&
    recipe.rating >= 1 &&
    recipe.rating <= 5 &&
    recipe.prepTimeMinutes > 0 &&
    recipe.difficulty >= 1 &&
    recipe.difficulty <= 5
  );
});

// Helper functions
const formatTime = (minutes: number): string => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} minutes`;
};

const getDifficultyLabel = (difficulty: number): string => {
  const labels = ["", "Very Easy", "Easy", "Medium", "Hard", "Very Hard"];
  return labels[difficulty] || "Unknown";
};

// Form handlers
const handleSubmit = async () => {
  if (isFormValid.value) {
    showPreview.value = true;
    const { data, error } = await useFetch("/api/recipes", {
      method: "post",
      body: recipe,

      onResponse() {
        recipeCreated.value = true;
      },
    });
  }
};

const resetForm = () => {
  Object.assign(recipe, {
    id: 0,
    name: "",
    image: "",
    rating: 1,
    prepTimeMinutes: 30,
    difficulty: 1,
  });
  showPreview.value = false;
  imageError.value = false;
};
</script>

<template>
  <div class="w-[30rem] mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Add New Recipe</h2>
    <div
      v-if="recipeCreated"
      class="p-4 flex items-center rounded bg-green-500"
    >
      Recipe has been added successfully!
    </div>
    <form @submit.prevent="handleSubmit" class="space-y-6 text-slate-700">
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Recipe Name
        </label>
        <input
          id="name"
          v-model="recipe.name"
          type="text"
          required
          maxlength="100"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Enter recipe name"
        />
      </div>

      <!-- Image URL Field -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          id="image"
          v-model="recipe.image"
          type="url"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="https://example.com/recipe-image.jpg"
        />
        <div v-if="recipe.image" class="mt-2">
          <img
            :src="recipe.image"
            :alt="recipe.name || 'Recipe preview'"
            class="w-32 h-32 object-cover rounded-md border"
            @error="imageError = true"
            @load="imageError = false"
          />
          <p v-if="imageError" class="text-red-500 text-sm mt-1">
            Failed to load image
          </p>
        </div>
      </div>

      <!-- Rating Field -->
      <div>
        <label
          for="rating"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Rating (1-5)
        </label>
        <div class="flex items-center space-x-2">
          <input
            id="rating"
            v-model.number="recipe.rating"
            type="number"
            required
            min="1"
            max="5"
            step="0.1"
            class="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <div class="flex">
            <Icon
              name="solar:star-bold"
              v-for="star in 5"
              :key="star"
              :class="[
                'w-5 h-5',
                star <= Math.floor(recipe.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300',
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Prep Time Field -->
      <div>
        <label
          for="prepTime"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Preparation Time (minutes)
        </label>
        <input
          id="prepTime"
          v-model.number="recipe.prepTimeMinutes"
          type="number"
          required
          min="1"
          max="1440"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Enter prep time in minutes"
        />
        <p class="text-sm text-gray-500 mt-1">
          {{ formatTime(recipe.prepTimeMinutes) }}
        </p>
      </div>

      <!-- Difficulty Field -->
      <div>
        <label
          for="difficulty"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Difficulty Level (1-5)
        </label>
        <div class="flex items-center space-x-4">
          <input
            id="difficulty"
            v-model.number="recipe.difficulty"
            type="range"
            min="1"
            max="5"
            step="1"
            class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span class="text-sm font-medium text-gray-700 min-w-[80px]">
            {{ getDifficultyLabel(recipe.difficulty) }}
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="resetForm"
          class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          :disabled="!isFormValid"
          class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add Recipe
        </button>
      </div>
    </form>

    <!-- Form Data Preview -->
    <div v-if="showPreview" class="mt-8 p-4 bg-gray-50 rounded-md">
      <h3 class="text-lg font-medium text-gray-800 mb-2">Recipe Preview:</h3>
      <pre class="text-sm text-gray-600 overflow-x-auto">{{
        JSON.stringify(recipe, null, 2)
      }}</pre>
    </div>
  </div>
</template>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
  border: none;
}
</style>
