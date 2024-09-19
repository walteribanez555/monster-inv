import { Injectable } from '@angular/core';
import { InputProduct } from '../../../../modules/warehouse/models/inputs/inputs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor() { }

  // id? : number;
  // input_id? : number;
  // warehouse_id : number;
  // provider_id : number;
  // quantity : number;
  // payment_amount : number;
  // detail : string;
  // date : string;

  mockData : InputProduct[] = [
    {
      id: 1,
      warehouse_id: 1,
      provider_id: 1,
      quantity: 10,
      date: '2021-01-01',
      payment_amount: 100,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 2,
      warehouse_id: 1,
      provider_id: 2,
      quantity: 20,
      date: '2021-01-02',
      payment_amount: 200,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 3,
      warehouse_id: 1,
      provider_id: 3,
      quantity: 30,
      date: '2021-01-03',
      payment_amount: 300,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 4,
      warehouse_id: 1,
      provider_id: 4,
      quantity: 40,
      date: '2021-01-04',
      payment_amount: 400,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 5,
      warehouse_id: 1,
      provider_id: 5,
      quantity: 50,
      date: '2021-01-05',
      payment_amount: 500,
      detail: 'Compra de productos de limpieza'
    },
    {
      id: 1,
      warehouse_id: 1,
      provider_id: 1,
      quantity: 10,
      date: '2021-01-01',
      payment_amount: 100,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 2,
      warehouse_id: 1,
      provider_id: 2,
      quantity: 20,
      date: '2021-01-02',
      payment_amount: 200,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 3,
      warehouse_id: 1,
      provider_id: 3,
      quantity: 30,
      date: '2021-01-03',
      payment_amount: 300,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 4,
      warehouse_id: 1,
      provider_id: 4,
      quantity: 40,
      date: '2021-01-04',
      payment_amount: 400,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 5,
      warehouse_id: 1,
      provider_id: 5,
      quantity: 50,
      date: '2021-01-05',
      payment_amount: 500,
      detail: 'Compra de productos de limpieza'
    },
    {
      id: 1,
      warehouse_id: 1,
      provider_id: 1,
      quantity: 10,
      date: '2021-01-01',
      payment_amount: 100,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 2,
      warehouse_id: 1,
      provider_id: 2,
      quantity: 20,
      date: '2021-01-02',
      payment_amount: 200,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 3,
      warehouse_id: 1,
      provider_id: 3,
      quantity: 30,
      date: '2021-01-03',
      payment_amount: 300,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 4,
      warehouse_id: 1,
      provider_id: 4,
      quantity: 40,
      date: '2021-01-04',
      payment_amount: 400,
      detail: 'Compra de productos de limpieza'

    },
    {
      id: 5,
      warehouse_id: 1,
      provider_id: 5,
      quantity: 50,
      date: '2021-01-05',
      payment_amount: 500,
      detail: 'Compra de productos de limpieza'
    },

  ]


  getInput() : Observable<InputProduct[]>{
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }


  updateInput() : Observable<InputProduct[]>{
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }


  createInput(input: InputProduct) : Observable<InputProduct>{
    return new Observable(subscriber => {
      subscriber.next(input);
      subscriber.complete();
    });
  }

  deleteInput(input: InputProduct) : Observable<InputProduct[]>{
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

}
