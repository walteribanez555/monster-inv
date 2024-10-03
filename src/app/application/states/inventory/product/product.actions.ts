export namespace ProductActions {

  export class Get {
    static readonly type = '[Product] Get';
    constructor(public product_id : number) {}
  }

  export class GetAll {
    static readonly type = '[Product] GetAll';
    constructor ( public params : {[key:string]:any}) {}
  }


  export class Delete {
    static readonly type = '[Product] Delete';
    constructor(public product_id : number) {}
  }


}
