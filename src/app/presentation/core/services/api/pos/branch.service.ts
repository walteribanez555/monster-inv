
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../../../../modules/pos/models/branches/Branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor() { }


  // export interface Branche {
  //   id? : number;
  //   branche_id? : number;
  //   name : string;
  //   status : number;

  // }


  mockData : Branch[] = [
    {
      id: 1,
      name: 'Sucursal 1',
      status: 1,
      warehouse_id : 1,
    },
    {
      id: 2,
      name: 'Sucursal 2',
      status: 1,
      warehouse_id : 2,
    },
    {
      id: 3,
      name: 'Sucursal 3',
      status: 1,
      warehouse_id : 3,
    },
    {
      id: 4,
      name: 'Sucursal 4',
      status: 1,
      warehouse_id : 4,
    }
  ]

  getBranch( ): Observable<Branch[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });

  }

  updateBranch( ): Observable<Branch[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });

  }

  deleteBranch( ): Observable<Branch[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });

  }

  createBranch( ): Observable<Branch[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });

  }




}
