import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { OrdersHeaderComponent } from '../../components/orders/orders-header/orders-header.component';
import { ListOrderComponent } from '../../components/orders/list-order/list-order.component';
import { OrderService } from '../../../../core/services/api/pos/order.service';
import { Order } from '../../models/orders/Order';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { OrdersDetailComponent } from '../../components/orders/orders-detail/orders-detail.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    OrdersHeaderComponent,
    ListOrderComponent,
    DcDirective,
  ],
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {

  @ViewChild(DcDirective) dcWrapper! : DcDirective;

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next : ( resp ) => {
        this.orders = resp;
      },
      error : ( err )=> {
        console.log({err});

      },
      complete : ( ) => {

      }
    })
  }
  onShowItem = false;
  orders : Order[] = [];

  private orderService = inject(OrderService);


  onViewItem( order : Order ) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory =
      viewContainerRef.createComponent(OrdersDetailComponent);
    // componentFactory.instance.inputDetailListener = this.inputDetailListener;
    // componentFactory.instance.inputProduct = input;

    this.onShowItem = true;
  }




}
