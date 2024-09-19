import { Injectable } from '@angular/core';
import { Order } from '../../../../modules/pos/models/orders/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  // id? : number;
  // order_id? : number;
  // venta_id : number;
  // address : string;
  // status : number;
  // observation : string;
  // date : string;

  mockData : Order[] = [
    {
      id: 1,
      venta_id: 1,
      address: 'Calle 1',
      status: 1,
      observation: 'Observacion 1',
      date: '2021-10-01',
    },
    {
      id: 2,
      venta_id: 2,
      address: 'Calle 2',
      status: 2,
      observation: 'Observacion 2',
      date: '2021-10-02',
    },
    {
      id: 3,
      venta_id: 3,
      address: 'Calle 3',
      status: 2,
      observation: 'Observacion 3',
      date: '2021-10-03',
    },
    {
      id: 4,
      venta_id: 4,
      address: 'Calle 4',
      status: 3,
      observation: 'Observacion 4',
      date: '2021-10-04',
    }
  ]


  getOrders() : Observable<Order[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  updateOrder() : Observable<Order[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  deleteOrder() : Observable<Order[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  createOrder() : Observable<Order[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }


}
