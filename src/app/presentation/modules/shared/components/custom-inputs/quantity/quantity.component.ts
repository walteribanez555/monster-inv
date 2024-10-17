import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './quantity.component.html',
})
export class QuantityComponent { }
