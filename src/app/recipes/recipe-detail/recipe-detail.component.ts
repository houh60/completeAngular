import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe?: Recipe;

    constructor(
        private shoppingListService: ShoppingListService,
        private recipeService: RecipeService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let id = +params['id'];
            this.recipe = this.recipeService.getRecipe(id);
        });
    }

    toShoppingList(ingredients: any) {
        this.shoppingListService.addIngredients(ingredients);
    }

}
