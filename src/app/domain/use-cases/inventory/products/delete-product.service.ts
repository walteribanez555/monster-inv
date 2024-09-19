import { Injectable } from '@angular/core';


export interface DeleteProductUseCase {
  execute ( id  : number) : Promise<any>;
}


@Injectable({
  providedIn: 'root'
})
export class DeleteProductService  implements DeleteProductUseCase {

  constructor() { }
  execute(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
