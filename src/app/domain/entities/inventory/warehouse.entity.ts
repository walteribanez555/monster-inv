export class WarehouseEntity {
  constructor (
    public readonly warehouse_id : number,
    public readonly name : string,
    public readonly status : number
   ) {

  }

  public static fromObject( props : {[key : string] : any}) {

    const { warehouse_id, name, status } = props;

    if(!warehouse_id) return ['Warehouse ID Property is Required', undefined];
    if(!name) return ['Name Property is Required', undefined];
    if(!status) return ['Status Property is Required', undefined];


    return [null, new WarehouseEntity(warehouse_id, name, status)];
  }
}
