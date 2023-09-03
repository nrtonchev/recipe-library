import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { RecipeItemDetailComponent } from './recipe-book/recipe-item/recipe-item-detail/recipe-item-detail.component';
import { NoRecipeSelectedComponent } from './recipe-book/no-recipe-selected/no-recipe-selected.component';
import { EditRecipeComponent } from './recipe-book/edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe-book', pathMatch: 'full' },
  { path: 'recipe-book', component: RecipeBookComponent, children: [
    { path: '', component: NoRecipeSelectedComponent },
    { path: 'new-recipe', component: EditRecipeComponent },
    { path: ':id/edit-recipe', component: EditRecipeComponent },
    { path: ':id', component: RecipeItemDetailComponent },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
