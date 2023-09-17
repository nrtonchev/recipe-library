import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('Okonomiyaki', 'The classic Japanese okonomiyaki recipe is perhaps the most famous Japanese street food - and rightly so. The crispy pancake outside, moist doughy vegetable-filled interior, sweet-sour sauce topping, and savoury umami-rich garnish, are the ideal foil to a boozy night in town.', 'https://www.souschef.co.uk/cdn/shop/articles/pancake-blog-header-image-1570px_900x.jpg?v=1612803899', [
  //     new Ingredient('Chicken', 1),
  //     new Ingredient('Flour', 1),
  //     new Ingredient('Egg', 2),
  //     new Ingredient('Water', 2),
  //     new Ingredient('Cabbage', 1)
  //   ]),
  //   new Recipe('Tonkotsu Ramen', 'A slow-simmered, rich and savory tonkotsu broth is the base to this ramen, which is rich from the meltingly tender chashu pork and soft-boiled egg and brightened by the pickled mushrooms.', 'https://www.foodandwine.com/thmb/KMjGvI2fQ_VBAGUn9IrRDYNSKCo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Tonkotsu-Ramen-FT-BLOG1122-8fe6c12d609a4fd4ab246bea3aae140e.jpg', [
  //     new Ingredient('Noodles', 1),
  //     new Ingredient('Broth', 1),
  //     new Ingredient('Pork', 2),
  //     new Ingredient('Mushroom', 2),
  //     new Ingredient('Egg', 2)
  //   ])
  // ];

  private recipes: Recipe[] = [];

  constructor() {
   }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(id: number){
    return this.recipes.at(id);
  }

  updateRecipe(id: number, newRecipe: Recipe){
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number){
    this.recipes = this.recipes.slice(0, id).concat(this.recipes.slice(id + 1));
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
