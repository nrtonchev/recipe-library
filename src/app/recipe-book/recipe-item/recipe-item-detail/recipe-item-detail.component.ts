import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item-detail',
  templateUrl: './recipe-item-detail.component.html',
  styleUrls: ['./recipe-item-detail.component.css']
})
export class RecipeItemDetailComponent implements OnInit{
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      var id = params['id'];
      this.recipe = this.recipeService.getRecipeById(+id);
    })
  }

  addToShoppingList(){
    this.shoppingListService.addMultipleIngredients(this.recipe.ingredients);
  }
}
