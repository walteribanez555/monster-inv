import { Injectable } from '@angular/core';
import { ProviderProduct } from '../../../../modules/warehouse/models/providers/ProviderProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor() {}

  // id? : number;
  // provider_id? : number;
  // name : string;
  // phone : string;
  // email : string;
  // address : string;
  // status : number;
  // date : string;

  mockData: ProviderProduct[] = [
    {
      id: 1,
      name: 'Proveedor 1',
      phone: '123456789',
      email: 'walter@gmail.com',
      address: 'Calle 1',
      status: 1,
      date: '2021-01-01',
    },
    {
      id: 2,
      name: 'Proveedor 2',
      phone: '123456789',
      email: 'developer@gmail.com',
      address: 'Calle 2',
      status: 1,
      date: '2021-01-02',
    },
    {
      id: 3,
      name: 'Proveedor 3',
      phone: '123456789',
      email: 'casia@dot.com',
      address: 'Calle 3',
      status: 1,
      date: '2021-01-03',
    },
  ];

  // getOutput():  Observable<OutputProduct[]>{
  //   return new Observable(subscriber => {
  //     subscriber.next(this.mockData);
  //     subscriber.complete();
  //   });
  // }

  getProvider(): Observable<ProviderProduct[]> {
    return new Observable((subscriber) => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  createProvider(providerProduct : ProviderProduct): Observable<ProviderProduct> {

    this.mockData.push(providerProduct);


    return new Observable((subscriber) => {
      subscriber.next(providerProduct);
      subscriber.complete();
    });
  }

  updateProvider(): Observable<ProviderProduct[]> {
    return new Observable((subscriber) => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  deleteProvider(): Observable<ProviderProduct[]> {
    return new Observable((subscriber) => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }
}
