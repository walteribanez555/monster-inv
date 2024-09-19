import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipes-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './recipes-header.component.html',

})
export class RecipesHeaderComponent {

  onAddToggle(){

  }
}
