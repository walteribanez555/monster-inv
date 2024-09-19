import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-modal-recipes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './modal-recipes.component.html',
})
export class ModalRecipesComponent { }
