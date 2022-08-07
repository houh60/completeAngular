import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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
        private shoppingListService: ShoppingListService
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
        console.log('this.ingredient: ', this.editedIngredient);
    }

    onAddIngredients(form: NgForm) {
        if(this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, form.value);
        } else {
            const newIngredients = new Ingredient(form.value.name, form.value.amount);
            this.shoppingListService.addIngredient(newIngredients);
        }
        this.editMode = false;
        form.reset();
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.slForm?.reset();
    }

    onClear(form: NgForm) {
        form.reset();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
