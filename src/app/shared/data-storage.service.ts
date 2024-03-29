import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

   private url = 'https://menu-66b70-default-rtdb.firebaseio.com/recipes.json';

   constructor(
      private http: HttpClient,
      private recipeService: RecipeService,
      private authService: AuthService
   ) {}

   storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put(this.url, recipes).subscribe(
         response => {
            console.log('response: ', response);
         }
      );
   }

   fetchRecipes() {
      return this.http.get<Recipe[]>(this.url)
         .pipe(map(recipies => {
            return recipies.map(recipe => {
               return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
         }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
         }));
   }
}
