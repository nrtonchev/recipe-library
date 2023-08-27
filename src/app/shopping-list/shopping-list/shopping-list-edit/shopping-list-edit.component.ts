import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') ingredientName: ElementRef;
  @ViewChild('amountInput') ingredientAmount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  addToShoppingList(){
    this.ingredientAdded.emit({
      name: this.ingredientName.nativeElement.value,
      amount: this.ingredientAmount.nativeElement.value
    });
  }
}
