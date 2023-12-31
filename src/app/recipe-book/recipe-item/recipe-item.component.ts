import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  recipe: Recipe;
  @Input()index: number;

  constructor(private recipeService: RecipeService){}
  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipeById(this.index);
  }
}
