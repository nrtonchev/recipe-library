import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../recipe-book/recipe.model";
import { RecipeService } from "../services/recipe.service";
import { inject } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";

export const recipesResolver: ResolveFn<Recipe[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const recipes = inject(RecipeService).getRecipes();

      if (recipes.length === 0){
        return inject(DataStorageService).fetchRecipes();
      }
      else {
        return recipes;
      }
    };