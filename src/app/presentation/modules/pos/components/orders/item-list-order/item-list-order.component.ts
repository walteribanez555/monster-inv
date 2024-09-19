import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '../../../models/orders/Order';

@Component({
  selector: '[item-list-order]',
  standalone: true,
  imports: [
    CommonModule,
    NgClass

  ],
  templateUrl : './item-list-order.component.html',
})
export class ItemListOrderComponent {

  @Input() order! : Order;


}
