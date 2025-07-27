<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

const { id, name, image, difficulty, prepTimeMinutes } = defineProps<Recipe>();
</script>

<template>
  <div
    class="w-[20rem] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <img class="rounded-t-lg w-80 h-72" :src="image" :alt="image" />

    <div class="p-5">
      <NuxtLink :to="{ name: 'recipe-id', params: { id } }">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ name }}
        </h5>
      </NuxtLink>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        difficulty: {{ difficulty }}
      </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        prepTimeMinutes: {{ prepTimeMinutes }}
      </p>
    </div>
  </div>
</template>
