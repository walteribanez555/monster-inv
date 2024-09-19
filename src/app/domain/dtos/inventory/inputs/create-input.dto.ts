

export class CreateInputDto {

  constructor(
    public readonly product_type_id : number,
    public readonly provider_id: number,
    public readonly warehouse_id: number,
    public readonly detail : string,
    public readonly quantity : number,
  ) {

  }


  public static create(props : {[key:string] : any}) {

    const { product_type_id, provider_id, warehouse_id, detail, quantity } = props;


    if(!product_type_id ) return['Product type id required', undefined];

    if(!provider_id ) return['Provider id required', undefined];

    if(!warehouse_id ) return['Warehouse id required', undefined];

    if(!detail ) return['Detail required', undefined];

    if(!quantity) return [ 'Quantity required', undefined];

    return [undefined, new CreateInputDto(product_type_id, provider_id, warehouse_id, detail, quantity)];

  }


}
