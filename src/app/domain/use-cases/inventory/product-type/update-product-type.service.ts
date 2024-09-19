import { Injectable } from '@angular/core';
import { ProductTypeEntity } from '../../../entities/inventory/product-type.entity';
import { UpdateProductTypeDto } from '../../../dtos/inventory/product-types/update-product-type';
import { ProductTypeRepository } from '../../../repositories/inventory/product-type.repository';

export interface UpdateProductTypeUseCase {
  execute(dto: UpdateProductTypeDto): Promise<ProductTypeEntity>;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateProductTypeService implements UpdateProductTypeUseCase {
  constructor(private repository: ProductTypeRepository) {}
  execute(dto: UpdateProductTypeDto): Promise<ProductTypeEntity> {
    return this.repository.udpate(dto);
  }
}
