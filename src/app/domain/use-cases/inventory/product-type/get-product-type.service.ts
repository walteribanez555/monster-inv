import { Injectable } from '@angular/core';
import { ProductTypeEntity } from '../../../entities/inventory/product-type.entity';
import { ProductTypeRepository } from '../../../repositories/inventory/product-type.repository';



export interface GetProductTypeUseCase {
   execute( id : number) : Promise<ProductTypeEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetProductTypeService implements GetProductTypeUseCase {

  constructor(
    private repository : ProductTypeRepository
  ) { }
  execute(id: number): Promise<ProductTypeEntity[]> {
    return this.repository.get(id);
  }

}
