import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-book/recipe-item/recipe-item.component';
import { RecipeItemDetailComponent } from './recipe-book/recipe-item/recipe-item-detail/recipe-item-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { NoRecipeSelectedComponent } from './recipe-book/no-recipe-selected/no-recipe-selected.component';
import { EditRecipeComponent } from './recipe-book/edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeItemDetailComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    HeaderComponent,
    RecipeBookComponent,
    NoRecipeSelectedComponent,
    EditRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
