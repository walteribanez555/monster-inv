import { Injectable } from '@angular/core';
import { Product } from '../../../../modules/warehouse/models/products/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // export interface Product  {
  //   id? : number;
  //   product_id? : number;
  //   almacen_id : number;
  //   category : string;
  //   name : string;
  //   description : string;
  //   price : number;
  //   discount : number;
  //   date : string;
  //   status : number;
  //   type : number;
  //   extras : number;
  // }

  mockData : Product[] = [
    {
      id : 1,
      almacen_id : 1,
      category : 'Limpieza',
      name : 'Cloro',
      description : 'Cloro para limpieza',
      price : 100,
      discount : 10,
      date : '2021-01-01',
      status : 1,
      type : 1,
      extras : 1
    },
    {
      id : 2,
      almacen_id : 1,
      category : 'Limpieza',
      name : 'Jabon',
      description : 'Jabon para limpieza',
      price : 200,
      discount : 20,
      date : '2021-01-02',
      status : 1,
      type : 1,
      extras : 2
    },
    {
      id : 3,
      almacen_id : 1,
      category : 'Limpieza',
      name : 'Desinfectante',
      description : 'Desinfectante para limpieza',
      price : 300,
      discount : 30,
      date : '2021-01-03',
      status : 1,
      type : 1,
      extras : 3
    },
    {
      id : 4,
      almacen_id : 1,
      category : 'Limpieza',
      name : 'Escoba',
      description : 'Escoba para limpieza',
      price : 400,
      discount : 40,
      date : '2021-01-04',
      status : 1,
      type : 1,
      extras : 4
    }

  ]


  getProduct(): Observable<Product[]>{
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  createProduct(product: Product): Observable<Product>{
    return new Observable(subscriber => {
      subscriber.next(product);
      subscriber.complete();
    });
  }

  updateProduct(product: Product): Observable<Product>{
    return new Observable(subscriber => {
      subscriber.next(product);
      subscriber.complete();
    });
  }

  deleteProduct(product: Product): Observable<Product>{
    return new Observable(subscriber => {
      subscriber.next(product);
      subscriber.complete();
    });
  }





}
