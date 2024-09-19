import { Injectable } from '@angular/core';
import { ProductTypeRepository } from '../../../repositories/inventory/product-type.repository';




export interface DeleteProductTypeUseCase {
  execute( id : number) :Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteProductTypesService implements DeleteProductTypeUseCase {

  constructor(
    private repository : ProductTypeRepository

  ) { }
  execute(id: number): Promise<any> {
    return this.repository.delete(id);
  }

}
