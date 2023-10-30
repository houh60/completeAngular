import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShopplingListActions from '../store/shopping-list.actions';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

   subscription?: Subscription;
   editMode = false;
   editedItemIndex = 0;
   editedIngredient?: Ingredient;
   @ViewChild('f') slForm?: NgForm;

   constructor(
      private shoppingListService: ShoppingListService,
      private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
   ) {}

   ngOnInit(): void {
      this.subscription = this.shoppingListService.startEditing.subscribe(index => {
         this.editedItemIndex = index as number;
         this.editedIngredient = this.shoppingListService.getIngredient(this.editedItemIndex);
         this.editMode = true;
         this.slForm?.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
         });
      });
   }

   onAddIngredients(form: NgForm) {
      if(this.editMode) {
         this.shoppingListService.updateIngredient(this.editedItemIndex, form.value);
      } else {
         const newIngredients = new Ingredient(form.value.name, form.value.amount);
         this.shoppingListService.addIngredient(newIngredients);
         this.store.dispatch(new ShopplingListActions.AddIngredient(newIngredients));
      }
      this.onClear();
   }

   onDelete() {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
   }

   onClear() {
      this.editMode = false;
      this.slForm?.reset();
   }

   ngOnDestroy(): void {
      this.subscription?.unsubscribe();
   }
}
