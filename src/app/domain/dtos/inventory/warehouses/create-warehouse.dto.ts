export class CreateWarehouseDto {
  constructor (
    public readonly name : string,
    public readonly status : number,
  ) {

  }


  public  static create(  props : { [ key : string ] : any }  ) {

    const { name , status} = props;


    if( !name ) return ['Name Property is Required', undefined];
    if( !status) return ['Status Property is Required', undefined];

    return [null, new CreateWarehouseDto(name, status)];

  }
}
