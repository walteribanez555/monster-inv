import { CreateProductDto } from "../../dtos/inventory/products/create-product.dto";
import { UpdateProductDto } from "../../dtos/inventory/products/update-product.dto";
import { ProductEntity } from "../../entities/inventory/product.entity";

export abstract class ProductRepository {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // abstract create( dto  : CreateProductDto) : Promise<ProductEntity>;
  // abstract update( dto : UpdateProductDto) : Promise<any>;
  abstract get( id : number ) : Promise<ProductEntity>;
  abstract getAll ( params : {[key:string]:any}) : Promise<ProductEntity[]>;
  abstract delete( id : number) : Promise<any>;
}
