import { Injectable } from '@angular/core';
import { ProductEntity } from '../../../entities/inventory/product.entity';
import { ProductRepository } from '../../../repositories/inventory/product.repository';


export interface GetProductsUseCase {
  execute( params : {[key:string] : any} ) : Promise<ProductEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetProductsService implements GetProductsUseCase {

  constructor(
    private repository : ProductRepository
  ) { }
  async execute(params : {[key:string] : any}): Promise<ProductEntity[]> {
    const resp = await this.repository.getAll(params);
    return resp;
  }




}
