import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../../models/orders/Order';
import { ItemListOrderComponent } from '../item-list-order/item-list-order.component';

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [
    CommonModule,
    ItemListOrderComponent,
  ],
  templateUrl : './list-order.component.html',

})
export class ListOrderComponent {

  @Input() orders! : Order[];

  @Output() itemSelected = new EventEmitter();


  onSelectTable( order : Order) {
    this.itemSelected.emit(order);
  }





 }
