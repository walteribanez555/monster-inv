// "product_type_id" : 11,
//     "warehouse_id" : 10,
//     "status" : 1,
//     "description" : "Demo",
//     "created_at" : "12:01:01",
//     "quantity" : 20,
//     "items" : [
//         {
//             "product_type_id": 10,
//             "quantity" : 2
//         }
//     ]


export interface PreparationItemDTO {
  product_type_id : number,
  quantity : number,
}



export class CreatePreparationDTO {

  constructor(
    public readonly product_type_id : number,
    public readonly warehouse_id : number,
    public readonly status : number,
    public readonly description : string,
    public readonly date_created: string,
    public readonly quantity : number,
    public readonly items : PreparationItemDTO[]
  ){

  }



  public static fromObj(props : {[key:string] : any}) {

    const { product_type_id, warehouse_id, status, description, created_at, quantity, items} = props;


    if(!product_type_id) return ['Product type id is required', undefined];

    if(!warehouse_id) return ['Warehouse Id is required', undefined];

    if(!status) return ['Status is required',undefined];

    if(!description) return ['Description is required', undefined];

    if(!created_at ) return ['Created at is required',undefined];

    if(!quantity) return ['Quantity is required', undefined];

    if(!items) return ['Items are required', undefined]


    return [undefined, new CreatePreparationDTO(product_type_id,warehouse_id,status,description,created_at,quantity,items)];
  }


}
