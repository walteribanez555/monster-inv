export class OutputEntity {
  constructor (
    public readonly output_id : number,
    public readonly product_type_id : number,
    public readonly warehouse_id : number,
    public readonly detail : string,
    public readonly quantity : number,
    public readonly product_id : number,
    public readonly date_created : string
   ) {

  }


  public static fromObject( props : {[key : string] : any}  ) {

    const { output_id, product_type_id, warehouse_id, detail, quantity, product_id, date_created} = props;

    if(!output_id) return ['Output id required', undefined];

    if(!product_type_id) return ['Product type id required', undefined];

    if(!warehouse_id) return ['Warehouse id required', undefined];

    if(!detail) return ['Detail required', undefined];

    if(!quantity) return ['Quantity required', undefined];

    if(!product_id) return ['Product id required', undefined];

    if(!date_created) return ['Date created required', undefined];

    return [undefined, new OutputEntity(output_id, product_type_id, warehouse_id, detail, quantity, product_id, date_created)];
  }
}
