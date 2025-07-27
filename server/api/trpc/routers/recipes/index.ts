import { createTRPCRouter } from "../../[...]";
import { createRecipe } from "./create";
import { getRecipes } from "./getAll";
import { getRecipeById } from "./getById";
import { deleteRecipe } from "./delete";
import { updateRecipe } from "./update";

export const recipesRouter = createTRPCRouter({
  createRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
});
