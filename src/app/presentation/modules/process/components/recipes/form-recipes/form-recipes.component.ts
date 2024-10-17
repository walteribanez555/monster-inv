import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListQuantityComponent } from "../../../../shared/components/custom-inputs/list-quantity/list-quantity.component";

@Component({
  selector: 'app-form-recipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListQuantityComponent
],
  templateUrl : './form-recipes.component.html',
})
export class FormRecipesComponent { }
