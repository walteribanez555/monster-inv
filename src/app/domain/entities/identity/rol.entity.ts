export class RolEntity {
  constructor(
    public readonly rol_id: number,
    public readonly rol_name : string,
    public readonly rol_structure : string,
    public readonly status : number,
  ) {

  }

  public static fromObject( props : {[key:string] : any}){
    const { rol_id, rol_structure, status,rol_name } = props;


    if(!rol_id) return  ['Rol id is required' , undefined];

    if(!rol_name) return [ 'Name id required', undefined];

    if(!rol_structure) return  ['Data is required' , undefined];


    if(!status) return  ['Status is required' , undefined];



    return [undefined, new RolEntity(rol_id,rol_name,rol_structure,status)];
  }

}
