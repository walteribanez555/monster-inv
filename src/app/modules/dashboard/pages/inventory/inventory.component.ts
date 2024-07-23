import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './inventory.component.html',
})
export class InventoryComponent { }
