import { CreateWarehouseDto } from "../../../domain/dtos/inventory/warehouses/create-warehouse.dto";
import { UpdateWarehouseDto } from "../../../domain/dtos/inventory/warehouses/update-warehouse.dto";
import { WarehouseEntity } from "../../../domain/entities/inventory/warehouse.entity";



export namespace WarehouseActions {
  export class Get{
    static readonly type = '[Warehouse] Get';
    constructor(public warehouse_id : number) {}
  }

  export class GetAll{
    static readonly type = '[Warehouse] GetAll';
  }


  export class Create {
    static readonly type = '[Warehouse] Create';
    constructor(public dto : CreateWarehouseDto)  {}
  }


  export class Update {
    static readonly type = '[Warehouse] Update';
    constructor(public dto : UpdateWarehouseDto) {}
  }

  export class Delete {
    static readonly type = '[Warehouse] Delete';
    constructor(public warehouse_id : number) {}
  }


}
