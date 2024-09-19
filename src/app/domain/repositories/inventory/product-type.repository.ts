import { CreateProductTypeDto } from '../../dtos/inventory/product-types/create-product-type';
import { UpdateProductTypeDto } from '../../dtos/inventory/product-types/update-product-type';
import { ProductTypeEntity } from '../../entities/inventory/product-type.entity';

export abstract class ProductTypeRepository {
  protected readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  abstract create(dto: CreateProductTypeDto): Promise<ProductTypeEntity>;
  abstract udpate(dto: UpdateProductTypeDto): Promise<ProductTypeEntity>;
  abstract get(id: number): Promise<ProductTypeEntity[]>;
  abstract getAll(): Promise<ProductTypeEntity[]>;
  abstract delete(id: number): Promise<any>;
}
