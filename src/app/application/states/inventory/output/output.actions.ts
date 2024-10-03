import { CreateOutputDto } from "../../../../domain/dtos/inventory/outputs/create-output.dto";

export namespace OutputActions {

  export class Get{
    static readonly type = '[Output] Get';
    constructor(public output_id : number) {}
  }


  export class GetAll {
    static readonly type = '[Output] GetAll';
    constructor( public params : {[key:string] : any}){}
  }

  export class Create{
    static readonly type = '[Output] Create';
    constructor( public dto : CreateOutputDto){}
  }

  export class Delete{
    static readonly type = '[Output] Delete';
    constructor( public id : number) {}
  }


}
