import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

   ingredientsChanged = new Subject<Ingredient[]>();
   startEditing = new Subject();

   private ingredients: Ingredient[] = [
      new Ingredient('Apple', 5),
      new Ingredient('Tomato', 10)
   ];

   getIngredients() {
      return this.ingredients.slice();
   }

   getIngredient(index: number) {
      return this.ingredients[index];
   }

   updateIngredient(index: number, ingredient: Ingredient) {
      this.ingredients[index].name = ingredient.name;
      this.ingredients[index].amount = ingredient.amount;
   }

   deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   addIngredient(newIngredient: Ingredient) {
      this.ingredients.push(newIngredient);
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next(this.ingredients.slice());
   }
}
