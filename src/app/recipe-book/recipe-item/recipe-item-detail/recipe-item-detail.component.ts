import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-item-detail',
  templateUrl: './recipe-item-detail.component.html',
  styleUrls: ['./recipe-item-detail.component.css']
})
export class RecipeItemDetailComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService){}

  addToShoppingList(){
    this.shoppingListService.addMultipleIngredients(this.recipe.ingredients);
  }
}
