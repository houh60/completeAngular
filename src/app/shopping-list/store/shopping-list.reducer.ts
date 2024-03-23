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
   action: actions.ShoppingListActions
) {
   switch (action.type) {
      case actions.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
         };
      case actions.ADD_INGREDIENTS:
         return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
         };

      case actions.UPDATE_INGREDIENT:
         const ingredient = state.ingredients[action.payload.index];
         const updatedIngredient = {
            ...ingredient,
            ...action.payload.ingredient
         };
         const updatedIngredients = [...state.ingredients];
         updatedIngredients[action.payload.index] = updatedIngredient;
         return {
            ...state,
            ingredients: updatedIngredients
         };

      case actions.DELETE_INGREDIENT:
         return {
            ...state,
            ingredients: state.ingredients.filter((ig, igIndex) => {
               return igIndex !== action.payload.index;
            })
         };
      default:
         return state;
   }
}
