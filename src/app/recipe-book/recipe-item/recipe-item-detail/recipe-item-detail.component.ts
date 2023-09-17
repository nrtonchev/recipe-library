import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item-detail',
  templateUrl: './recipe-item-detail.component.html',
  styleUrls: ['./recipe-item-detail.component.css']
})
export class RecipeItemDetailComponent implements OnInit{
  @Input() recipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.recipe = this.recipeService.getRecipeById(+this.id);
    })
  }

  addToShoppingList(){
    this.shoppingListService.addMultipleIngredients(this.recipe.ingredients);
  }

  onRecipeDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
