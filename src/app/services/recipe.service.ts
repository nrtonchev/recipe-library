import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'Test Desc', 'https://live.staticflickr.com/8459/7967375756_b4a6f560c3.jpg', [
      new Ingredient('Noodles', 1),
      new Ingredient('Broth', 1),
      new Ingredient('Egg', 2),
    ]),
    new Recipe('Another test recipe', 'Another Test Desc', 'https://live.staticflickr.com/8459/7967375756_b4a6f560c3.jpg', [
      new Ingredient('Noodles', 1),
      new Ingredient('Broth', 1),
      new Ingredient('Pork', 2),
      new Ingredient('Mushroom', 2)
    ])
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }
}
