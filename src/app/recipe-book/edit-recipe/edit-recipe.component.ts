import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService){}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log(this.editMode);
    })
  }

  onSubmit(){
    
  }

  private initForm() {
    let recipeName = '';
    let imgUrl = '';
    let description = '';
    let ingredients = [];

    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      imgUrl = recipe.imagePath;
      description = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imgUrl),
      'description': new FormControl(description)
    });
  }
}
