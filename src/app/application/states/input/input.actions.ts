import { CreateInputDto } from "../../../domain/dtos/inventory/inputs/create-input.dto";

export namespace InputActions  {


  export class Get{
    static readonly type = '[Input] Get';
    constructor(public input_id : number) {}
  }

  export class GetAll{
    static readonly type = '[Input] GetAll';
    constructor( public params : {[key:string] : any}){}
  }

  export class Create{
    static readonly type = '[Input] Create';
    constructor( public dto : CreateInputDto){}
  }

  export class Delete{
    static readonly type = '[Input] Delete';
    constructor( public id : number) {}
  }

}
