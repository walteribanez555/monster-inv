import { CreateProductTypeDto } from "../../../../domain/dtos/inventory/product-types/create-product-type";
import { UpdateProductTypeDto } from "../../../../domain/dtos/inventory/product-types/update-product-type";

export namespace ProductTypeActions {

  export class Get{
    static readonly type = '[ProductType] Get';
    constructor(public product_type_id : number) {}
  }

  export class GetAll {
    static readonly type = '[ProductType] GetAll';
  }

  export class Create{
    static readonly type = '[ProductType] Create';
    constructor(public dto: CreateProductTypeDto) {}
  }

  export class Update {
    static readonly type = '[ProductType] Update';
    constructor(public dto : UpdateProductTypeDto) {}
  }

  export class Delete {
    static readonly type = '[ProductType] Delete';
    constructor(public product_type_id : number) {}
  }


}
