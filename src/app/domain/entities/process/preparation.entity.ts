export class PreparationEntity{

  constructor(
    public readonly preparation_id : number,
    public readonly product_type_id : number,
    public readonly warehouse_id : number,
    public readonly date_created : string,
    public readonly status : number,
    public readonly description : string,
    public readonly quantity : number,
    public readonly type : number,
   ) {




  }


  public static fromObj( props : {[key:string] : any  }  ) {
      const { preparation_id, product_type_id, warehouse_id, date_created, status,description,quantity,type  } = props;


      if(!preparation_id) return ['Preparation id is required' , undefined];

      if(!product_type_id) return ['Product type id is required', undefined];

      if(!warehouse_id) return ['Warehouse Id is required' , undefined];

      if(!date_created) return  ['date created is required'];

      if(!status) return ['Status is required' , undefined];

      if(!description) return ['Description is required', undefined];

      if(quantity == undefined || quantity== null) return ['Quantity is Required' , undefined];

      if(!type) return ['Type is Required', undefined];


      return [undefined, new PreparationEntity(preparation_id,product_type_id,warehouse_id,date_created,status,description,quantity,type)];
    }


}
