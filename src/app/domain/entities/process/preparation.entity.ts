export class PreparationEntity{

  constructor(
    public readonly preparation_id : number,
    public readonly product_type_id : number,
    public readonly warehouse_id : number,
    public readonly created_at : string,
    public readonly status : number,
    public readonly description : string,
   ) {




  }


  public static fromObj( props : {[key:string] : any  }  ) {
      const { preparation_id, product_type_id, warehouse_id, created_at, status,description  } = props;


      if(!preparation_id) return ['Preparation id is required' , undefined];

      if(!product_type_id) return ['Product type id is required', undefined];

      if(!warehouse_id) return ['Warehouse Id is required' , undefined];

      if(!created_at) return  ['Created at is required'];

      if(!status) return ['Status is required' , undefined];

      if(!description) return ['Description is required', undefined];


      return [undefined, new PreparationEntity(preparation_id,product_type_id,warehouse_id,created_at,status,description)];
    }


}
