import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item-list-recipes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './item-list-recipes.component.html',

})
export class ItemListRecipesComponent { }
