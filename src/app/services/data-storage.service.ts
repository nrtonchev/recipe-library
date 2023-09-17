import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipe-book/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url = 'https://recipe-library-ng-default-rtdb.europe-west1.firebasedatabase.app/';
  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url + 'recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.url + 'recipes.json')
    .pipe(map(recipesData => {
      return recipesData.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
