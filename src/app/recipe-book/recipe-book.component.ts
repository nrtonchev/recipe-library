import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit{
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private router:Router, private activeRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.recipe = recipe;

      if(this.recipe){
        this.router.navigate([this.recipe.id], {relativeTo: this.activeRoute});
      }
      else{
        this.router.navigate([''], {relativeTo: this.activeRoute});
      }
    })
  }

}
