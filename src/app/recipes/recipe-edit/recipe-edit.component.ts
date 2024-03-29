import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
   selector: 'app-recipe-edit',
   templateUrl: './recipe-edit.component.html',
   styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

   id: number = 0;
   editMode = false;
   recipeForm: UntypedFormGroup = new UntypedFormGroup({});

   constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe(params => {
         this.id = +params['id'];
         this.editMode = params['id'] != null;
         this.initForm();
      });
   }

   private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new UntypedFormArray([]);

      if(this.editMode) {
         const recipe = this.recipeService.getRecipe(this.id);
         recipeName = recipe.name;
         recipeImagePath = recipe.imagePath;
         recipeDescription = recipe.description;
         if(recipe['ingredients']) {
            for(let ingredient of recipe.ingredients) {
               recipeIngredients.push(
                  new UntypedFormGroup({
                     name: new UntypedFormControl(ingredient.name, Validators.required),
                     amount: new UntypedFormControl(ingredient.amount, [Validators.required, Validators.min(1)]),
                  })
               );
            }
         }
      }

      this.recipeForm = new UntypedFormGroup({
         name: new UntypedFormControl(recipeName, Validators.required),
         imagePath: new UntypedFormControl(recipeImagePath, Validators.required),
         description: new UntypedFormControl(recipeDescription, Validators.required),
         ingredients: recipeIngredients
      });
   }

   onSubmit() {
      if(this.editMode) {
         this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
         this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.onCancel();
   }

   getControls() {
      return (this.recipeForm.get('ingredients') as UntypedFormArray).controls;
   }

   onAddIngredient() {
      (this.recipeForm.get('ingredients') as UntypedFormArray).push(new UntypedFormGroup({
         name: new UntypedFormControl(null, Validators.required),
         amount: new UntypedFormControl(null, [Validators.required, Validators.min(1)]),
      }));
   }

   onCancel() {
      this.router.navigate(['../'], { relativeTo: this.route });
   }

   onDeleteIngredient(index: number) {
      (this.recipeForm.get('ingredients') as UntypedFormArray).removeAt(index);
   }
}
