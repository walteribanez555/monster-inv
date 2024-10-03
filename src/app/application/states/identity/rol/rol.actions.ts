import { CreateRolDto } from "../../../../domain/dtos/identity/rol/create-rol.dto";
import { UpdateRolDto } from "../../../../domain/dtos/identity/rol/update-rol.dto";

export namespace RolActions {

  export class Get{
    static readonly type = '[Rol] Get';
    constructor(public rol_id : number) {}
  }

  export class GetAll{
    static readonly type = '[Rol] GetAll';
    constructor( public params : {[key:string] : any}){}
  }

  export class Create{
    static readonly type = '[Rol] Create';
    constructor( public dto : CreateRolDto){}
  }

  export class Update{
    static readonly type = '[Rol] Update';
    constructor( public dto : UpdateRolDto){}
  }

  export class Delete{
    static readonly type = '[Rol] Delete';
    constructor( public id : number) {}
  }

}
