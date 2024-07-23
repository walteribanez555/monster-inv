import { CommonModule } from '@angular/common';
import {Component } from '@angular/core';
import { OrdersHeaderComponent } from '../../components/orders/orders-header/orders-header.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    OrdersHeaderComponent,
  ],
  templateUrl : './orders.component.html',

})
export class OrdersComponent { }
