export class UpdateWarehouseDto {
  constructor(
    public readonly warehouse_id : number,
    public readonly name : string,
    public readonly status : number,


  ) {}

  public static create(props: { [key: string]: any }) {
    const  { warehouse_id, name, status } = props;


    if(!warehouse_id) return ['Warehouse ID Property is Required', undefined];
    if(!name) return ['Name Property is Required', undefined];
    if(!status) return ['Status Property is Required', undefined];

    return [null, new UpdateWarehouseDto(warehouse_id, name, status)];
  }
}
