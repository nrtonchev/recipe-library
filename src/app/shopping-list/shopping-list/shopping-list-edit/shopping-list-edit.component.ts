import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  @ViewChild('shoppingListForm') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem:Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index:number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } 
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value;
    let newIngredient = new Ingredient(value.name,
      value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    }
    else{
      this.shoppingListService.addToShoppingList(newIngredient);
    }
    form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
