import { Ingredient } from "../../shared/ingredient.model";

import * as actions from "./shopping-list.actions";

const initialState = {
   ingredients: [
      new Ingredient('Apple', 5),
      new Ingredient('Tomato', 10)
   ]
};
export function shoppingListReducer(
   state = initialState,
   action: actions.AddIngredient
) {
   switch (action.type) {
      case actions.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
         };
      default:
         return state;
   }
}
