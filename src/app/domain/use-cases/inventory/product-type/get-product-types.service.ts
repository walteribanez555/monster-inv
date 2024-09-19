import { Injectable } from '@angular/core';
import { ProductTypeEntity } from '../../../entities/inventory/product-type.entity';
import { ProductTypeRepository } from '../../../repositories/inventory/product-type.repository';



export interface GetProductTypesUseCase{
  execute( ) : Promise<ProductTypeEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetProductTypesService implements GetProductTypesUseCase {

  constructor(
    private repository : ProductTypeRepository
  ) { }
  execute(): Promise<ProductTypeEntity[]> {
    return this.repository.getAll();
  }

}
