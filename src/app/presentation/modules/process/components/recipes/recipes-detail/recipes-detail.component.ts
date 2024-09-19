import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipes-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: 'recipes-detail.component.html',

})
export class RecipesDetailComponent { }
