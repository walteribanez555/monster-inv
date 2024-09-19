import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item-list-preparation',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : 'item-list-preparation.component.html',
})
export class ItemListPreparationComponent { }
