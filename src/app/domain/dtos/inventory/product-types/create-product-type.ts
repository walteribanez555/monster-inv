export class CreateProductTypeDto {
  constructor(
    private readonly name : string,
    private readonly status : string,
    private readonly categories : string,
    private readonly type : number
  ) {

  }



  public static create( props : {[key:string]:  any } ) {
    const { name , status, categories, type} = props;



    if(!name) return ['Name required', undefined];
    if(!status) return ['Status required', undefined];
    if(!categories) return ['Categories required', undefined];
    if(!type) return ['Type required', undefined];


    return [undefined, new CreateProductTypeDto(name, status, categories, type)];



  }
}
