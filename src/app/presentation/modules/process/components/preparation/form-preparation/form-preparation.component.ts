import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListQuantityComponent } from "../../../../shared/components/custom-inputs/list-quantity/list-quantity.component";

@Component({
  selector: 'app-form-preparation',
  standalone: true,
  imports: [
    CommonModule,
    ListQuantityComponent
],
  templateUrl: './form-preparation.component.html'
})
export class FormPreparationComponent { }
