import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {

    private recipes: Recipe[] = [];

    recipeSelected = new Subject<Recipe>();
    recipesUpdated = new Subject<Recipe[]>();

    setRecipes(recipies: Recipe[]) {
        this.recipes = recipies;
        this.recipesUpdated.next(this.recipes);
    }

    getRecipes() {
        return this.recipes;
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    delete(id: number) {
        this.recipes.splice(id, 1);
        this.recipesUpdated.next(this.recipes);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesUpdated.next(this.recipes);
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesUpdated.next(this.recipes);
    }
}
