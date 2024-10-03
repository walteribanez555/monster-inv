export  class CreateRolDto {
  constructor(
    public readonly rol_name : string,
    public readonly rol_structure : string,
    public readonly status : number,
  ) {

  }


  public static create( props : {[key:string] : any}){
    const {  rol_name , rol_structure, status} = props;


    if(!rol_name ) return ['Rol name is required' , undefined];

    if(!rol_structure ) return ['Rol structure is required' , undefined];

    if(!status)  return ['Status is required' , undefined];


    return [null, new CreateRolDto(rol_name, rol_structure, status)];



  }
}
