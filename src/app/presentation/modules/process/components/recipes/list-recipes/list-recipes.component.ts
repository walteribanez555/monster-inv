import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : 'list-recipes.component.html',

})
export class ListRecipesComponent { }
