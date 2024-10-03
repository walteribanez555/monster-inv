import { CreateUserDto } from "../../../../domain/dtos/identity/user/create-user.dto";
import { UpdateUserDto } from "../../../../domain/dtos/identity/user/update-user.dto";

export namespace UserActions {

  export class Get{
    static readonly type = '[User] Get';
    constructor(public username: string) {}
  }

  export class GetAll{
    static readonly type = '[User] GetAll';
    constructor( public params : {[key:string] : any}){}
  }

  export class Create{
    static readonly type = '[User] Create';
    constructor( public dto : CreateUserDto){}
  }

  export class Update{
    static readonly type = '[User] Update';
    constructor( public dto : UpdateUserDto){}
  }

  export class Delete{
    static readonly type = '[User] Delete';
    constructor( public username : string) {}
  }

}
