import { Injectable } from '@angular/core';
import { CreateProductTypeDto } from '../../../dtos/inventory/product-types/create-product-type';
import { ProductTypeEntity } from '../../../entities/inventory/product-type.entity';
import { ProductTypeRepository } from '../../../repositories/inventory/product-type.repository';

export interface CreateProductTypeUseCase {
  execute(dto: CreateProductTypeDto): Promise<ProductTypeEntity>;
}

@Injectable({
  providedIn: 'root',
})
export class CreateProductTypeService implements CreateProductTypeUseCase {
  constructor(private repository: ProductTypeRepository) {}
  execute(dto: CreateProductTypeDto): Promise<ProductTypeEntity> {
    return this.repository.create(dto);
  }
}
