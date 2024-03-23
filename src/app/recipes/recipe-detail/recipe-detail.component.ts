import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShopplingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
   selector: 'app-recipe-detail',
   templateUrl: './recipe-detail.component.html',
   styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

   recipe: Recipe;
   id: number = 0;

   constructor(
      private shoppingListService: ShoppingListService,
      private recipeService: RecipeService,
      private route: ActivatedRoute,
      private router: Router,
      private store: Store<{ shoppingList: { ingredients: Ingredient[]; }; }>
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe(params => {
         console.log("params: ", params);
         this.id = +params['id'];
         this.recipe = this.recipeService.getRecipe(this.id);
         console.log("this.recipe: ", this.recipe);
      });
   }

   toShoppingList(ingredients: any) {
      // this.shoppingListService.addIngredients(ingredients);
      this.store.dispatch(new ShopplingListActions.AddIngredients(ingredients));
   }

   onEditRecipe() {
      this.router.navigate(['edit'], { relativeTo: this.route });
   }

   onDeleteRecipe(id: number) {
      this.recipeService.delete(id);
      this.router.navigate(['/recipes']);
   }

}
