import { Injectable } from '@angular/core';
import { OutputProduct } from '../../../../modules/warehouse/models/outputs/outputs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  constructor() { }

  // id? : number;
  // output_id? : number;
  // warehouse_id : number;
  // product_id : number;
  // quantity : number;
  // detail : number;
  // date : string;

  mockData : OutputProduct[] = [
    {
      id: 1,
      warehouse_id: 1,
      product_id: 1,
      quantity: 10,
      date: '2021-01-01',
      detail: 1

    },
    {
      id: 2,
      warehouse_id: 1,
      product_id: 2,
      quantity: 20,
      date: '2021-01-02',
      detail: 2

    },
    {
      id: 3,
      warehouse_id: 1,
      product_id: 3,
      quantity: 30,
      date: '2021-01-03',
      detail: 3

    },
    {
      id: 4,
      warehouse_id: 1,
      product_id: 4,
      quantity: 40,
      date: '2021-01-04',
      detail: 4
    }
  ]


  getOutput():  Observable<OutputProduct[]>{
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }



  createOutput(output: OutputProduct): Observable<OutputProduct>{
    return new Observable(subscriber => {
      this.mockData.push(output);
      subscriber.next(output);
      subscriber.complete();
    });
  }

  updateOutput(output: OutputProduct): Observable<OutputProduct>{
    return new Observable(subscriber => {
      const index = this.mockData.findIndex(x => x.id === output.id);
      this.mockData[index] = output;
      subscriber.next(output);
      subscriber.complete();
    });
  }


  deleteOutput(output: OutputProduct): Observable<OutputProduct>{
    return new Observable(subscriber => {
      const index = this.mockData.findIndex(x => x.id === output.id);
      this.mockData.splice(index, 1);
      subscriber.next(output);
      subscriber.complete();
    });
  }


}
