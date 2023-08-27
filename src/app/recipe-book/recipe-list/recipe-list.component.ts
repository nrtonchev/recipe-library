import { Component, EventEmitter, OnChanges, Output, ViewChild } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent{
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'Test Desc', 'https://live.staticflickr.com/8459/7967375756_b4a6f560c3.jpg'),
    new Recipe('Another test recipe', 'Another Test Desc', 'https://live.staticflickr.com/8459/7967375756_b4a6f560c3.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
