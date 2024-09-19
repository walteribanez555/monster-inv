import { Injectable } from '@angular/core';
import { UpdateProductDto } from '../../../dtos/inventory/products/update-product.dto';



export interface UpdateProductUseCase {
  execute( dto : UpdateProductDto) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService implements UpdateProductUseCase{

  constructor() { }
  execute(dto: UpdateProductDto): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
