import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currActiveContainer: string = 'RecipeList';

  selectActiveContainer(activeContainer: string){
    this.currActiveContainer = activeContainer;
  }
}
