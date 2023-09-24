import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { RecipeItemDetailComponent } from './recipe-book/recipe-item/recipe-item-detail/recipe-item-detail.component';
import { NoRecipeSelectedComponent } from './recipe-book/no-recipe-selected/no-recipe-selected.component';
import { EditRecipeComponent } from './recipe-book/edit-recipe/edit-recipe.component';
import { recipesResolver } from './shared/recipes.resolver';
import { AuthComponent } from './auth/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe-book', pathMatch: 'full' },
  { path: 'recipe-book', component: RecipeBookComponent, children: [
    { path: '', component: NoRecipeSelectedComponent },
    { path: 'new-recipe', component: EditRecipeComponent },
    { path: ':id/edit-recipe', resolve: {data: recipesResolver}, component: EditRecipeComponent },
    { path: ':id', resolve: {data: recipesResolver}, component: RecipeItemDetailComponent },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
