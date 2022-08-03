import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'Steak', 'A super-tasty steak! Awesome!',
            'https://www.eatwell101.com/wp-content/uploads/2020/10/Garlic-Butter-Steak-recipe-roasted-in-Oven.jpg',
            [
                new Ingredient('Beef', 1),
                new Ingredient('Potatos', 5),
                new Ingredient('Green beans', 15)
            ]
        ),

        new Recipe(
            'Fried Chicken', 'What else do you need?',
            'https://www.eatwell101.com/wp-content/uploads/2019/04/chicken-and-asparagus-skillet-recipe-2.jpg',
            [
                new Ingredient('Chicken', 1),
                new Ingredient('Asparagus', 20),
                new Ingredient('Lemon slices', 2)
            ]
        ),
    ];

    recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }
}
