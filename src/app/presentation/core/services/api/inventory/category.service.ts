import { Injectable } from '@angular/core';
import { Category } from '../../../../modules/warehouse/models/categories/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

//   export interface Category {
//     id? : number;
//     category_id? : number;
//     name : string;
//     description : string;
//     date : string;
//     status : number;
//  }


  constructor() { }


  mockData : Category[] = [
    {
      id: 1,
      name: 'Limpieza',
      description: 'Productos de limpieza',
      date: '2021-01-01',
      status: 1
    },
    {
      id: 2,
      name: 'Herramientas',
      description: 'Herramientas de trabajo',
      date: '2021-01-02',
      status: 1
    },
    {
      id: 3,
      name: 'Alimentos',
      description: 'Productos comestibles',
      date: '2021-01-03',
      status: 1
    },
    {
      id: 4,
      name: 'Electrodomesticos',
      description: 'Electrodomesticos para el hogar',
      date: '2021-01-04',
      status: 1
    }

  ]

  // updateInput() : Observable<InputProduct[]>{
  //   return new Observable(subscriber => {
  //     subscriber.next(this.mockData);
  //     subscriber.complete();
  //   });
  // }

  getCategory() : Observable<Category[]> {
    return new Observable(subscriber => {
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  createCategory(category: Category) : Observable<Category[]> {
    return new Observable(subscriber => {
      this.mockData.push(category);
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  updateCategory(category: Category) : Observable<Category[]> {
    return new Observable(subscriber => {
      const index = this.mockData.findIndex(item => item.id === category.id);
      this.mockData[index] = category;
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }

  deleteCategory(id: number) : Observable<Category[]> {
    return new Observable(subscriber => {
      this.mockData = this.mockData.filter(item => item.id !== id);
      subscriber.next(this.mockData);
      subscriber.complete();
    });
  }


}
