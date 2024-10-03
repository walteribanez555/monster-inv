import { CreateProviderDto } from "../../../../domain/dtos/inventory/providers/create-provider.dto";
import { UpdateProviderDto } from "../../../../domain/dtos/inventory/providers/update-provider.dto";


export namespace ProviderActions{

  export class Get{
    static readonly type = '[Provider] Get';
    constructor(public provider_id : number) {}
  }

  export class GetAll{
    static readonly type = '[Provider] GetAll';
  }

  export class Create{
    static readonly type = '[Provider] Create';
    constructor(public dto : CreateProviderDto)  {}

  }

  export class Update{
    static readonly type = '[Provider] Update';
    constructor(public dto : UpdateProviderDto) {}

  }

  export class Delete{
    static readonly type = '[Provider] Delete';
    constructor(public provider_id : number) {}

  }



}
