import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-recipes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './form-recipes.component.html',
})
export class FormRecipesComponent { }
