import { Injectable } from '@angular/core';
import { ProductEntity } from '../../../entities/inventory/product.entity';
import { ProductRepository } from '../../../repositories/inventory/product.repository';


export interface GetProductUseCase {
  execute( id : number) : Promise<ProductEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class GetProductService implements GetProductUseCase {

  constructor(
    private repository : ProductRepository
  ) { }
  async execute(id: number): Promise<ProductEntity> {
    return await this.repository.get(id);
  }



}
