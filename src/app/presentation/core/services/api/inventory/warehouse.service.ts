import { Injectable } from '@angular/core';
import { Warehouse } from '../../../../modules/warehouse/models/warehouses/warehouse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor() { }


  mockData : Warehouse[] = [
    {
      id: 1,
      name : 'Norte',
      status : 1,
    },
    {
      id: 2,
      name : 'Las Brisas',
      status : 1,
    },
    {
      id :3,
      name : 'Contenedores',
      status : 1,
    }
  ]


  getWarehouse() :Observable<Warehouse[]>  {
    return new Observable(observer => {
      const listItems = this.mockData;
      observer.next(listItems);
      observer.complete();
    });
  }


  updateWarehouse() {

  }

  createWarehouse(newWareHouse : Warehouse) : Observable<Warehouse> {
    this.mockData.push(newWareHouse);
    return new Observable(observer => {
      observer.next(newWareHouse);
      observer.complete();
    });

  }

  deleteWarehouse() {

  }







}
