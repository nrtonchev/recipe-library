import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  startedEditing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    if(this.ingredients.length > index){
      return this.ingredients.at(index);
    }

    return null;
  }

  addToShoppingList(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addMultipleIngredients(newIngredients: Ingredient[]){
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    if(this.ingredients.length > index){
      this.ingredients = this.ingredients.slice(0, index).concat(this.ingredients.slice(index + 1));
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }
}
