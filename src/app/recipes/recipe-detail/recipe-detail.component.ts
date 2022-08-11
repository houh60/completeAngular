import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
   id: number = 0;

   constructor(
      private shoppingListService: ShoppingListService,
      private recipeService: RecipeService,
      private route: ActivatedRoute,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe(params => {
         this.id = +params['id'];
         this.recipe = this.recipeService.getRecipe(this.id);
      });
   }

   toShoppingList(ingredients: any) {
      this.shoppingListService.addIngredients(ingredients);
   }

   onEditRecipe() {
      this.router.navigate(['edit'], { relativeTo: this.route });
   }

   onDeleteRecipe(id: number) {
      this.recipeService.delete(id);
      this.router.navigate(['/recipes']);
   }

}
