import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

   ingredients: Observable<{ ingredients: Ingredient[]; }>;
   nonObsevableIngredients: Ingredient[];
   subscription = new Subscription();

   constructor(
      private shoppingListService: ShoppingListService,
      private store: Store<{ shoppingList: { ingredients: Ingredient[]; }; }>
   ) {}

   ngOnInit(): void {
      this.ingredients = this.store.select('shoppingList');
      this.subscription = this.store.select('shoppingList').subscribe(
         nonObsevableIngredients =>
            this.nonObsevableIngredients =
            nonObsevableIngredients
               .ingredients
               .filter(ingredient => ingredient != undefined)
      );
      // this.ingredients = this.shoppingListService.getIngredients();
      // this.subscription = this.shoppingListService.ingredientsChanged
      //    .subscribe(ingredients => this.ingredients = ingredients);
   }

   onEditItem(index: number) {
      this.shoppingListService.startEditing.next(index);
   }

   ngOnDestroy(): void {
      // this.subscription?.unsubscribe();
   }
}
