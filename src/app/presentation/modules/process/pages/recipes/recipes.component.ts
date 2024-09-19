import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { RecipesHeaderComponent } from '../../components/recipes/recipes-header/recipes-header.component';
import { ListRecipesComponent } from '../../components/recipes/list-recipes/list-recipes.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    RecipesHeaderComponent,
    ListRecipesComponent,
  ],
  templateUrl : './recipes.component.html',

})
export class RecipesComponent {

  onShowItem : boolean = false;
}
