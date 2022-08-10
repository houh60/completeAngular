import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeRoutingModule } from './recipe-routing.module';

@NgModule({
   declarations: [
      RecipesComponent,
      RecipeListComponent,
      RecipeDetailComponent,
      RecipeItemComponent,
      RecipeEditComponent,
      RecipeStartComponent,
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      RecipeRoutingModule
   ],
   exports: []
})
export class RecipeModule {}
