import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   declarations: [
      ShoppingListComponent,
      ShoppingEditComponent,
   ],
   imports: [
      FormsModule,
      RouterModule,
      ShoppingListRoutingModule,
      SharedModule
   ],
   exports: []
})
export class ShoppingListModule {}
