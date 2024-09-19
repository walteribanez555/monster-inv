import { Injectable } from '@angular/core';
import { CreateProductDto } from '../../../dtos/inventory/products/create-product.dto';
import { ProductEntity } from '../../../entities/inventory/product.entity';


export interface CreateProductUseCase{
  execute ( dto : CreateProductDto) : Promise<ProductEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateProductService implements CreateProductUseCase {

  constructor() { }
  execute(dto: CreateProductDto): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }

}
