export class UpdateUserDto {

  constructor(
    public readonly user_id : number,
    public readonly username : string,
    public readonly password : string,
    public readonly confirm : string,
    public readonly status : number,
    public readonly rols : string,
    public readonly name : string,
   ) {

  }



  public static create(props : {[key:string] : any}){
    const { user_id, name , username , password, confirm, status, rols } = props;

    if(!user_id) return ['User id is required' , undefined];

    if(!username) return ['Username is required' , undefined];

    if(!password) return ['Password is required' , undefined];

    if(!confirm) return ['Password confirmation is required' , undefined];

    if(!status) return ['Status is required' , undefined];

    if(!rols) return ['Rols is required' , undefined];

    if(!name) return ['Name is required' , undefined];

    return [undefined , new UpdateUserDto(user_id, username, password, confirm, status, rols, name)];
  }


}
