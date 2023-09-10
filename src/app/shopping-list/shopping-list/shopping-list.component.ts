import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private idChangedSub: Subscription;
  
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangedSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy(): void {
    this.idChangedSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}
