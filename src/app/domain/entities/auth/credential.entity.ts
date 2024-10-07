export class CredentialEntity {
  constructor(
    public readonly token : string,
    public readonly name : string,
    public readonly rols : string,
    public readonly user_id : string,
    public readonly username : string
  ) {

  }


  public static fromObject( props : {[key:string] : any}){

    const { sessionToken, name, rols, user_id, username  } = props;

    if(!sessionToken) return ['Token is required', undefined];

    if(!name) return ['Name is required', undefined];

    if(!rols) return ['Rols is required', undefined];

    if(!user_id) return ['User id is required', undefined];

    if(!username) return ['Username is required', undefined];


    const rolsMapped : string = rols.map( (rol : any) => JSON.stringify(rol)).join('~');

    console.log({rolsMapped});



    return [undefined, new CredentialEntity(sessionToken, name, rolsMapped, user_id, username)];
  }

  public static fromLocalStorage( props : {[key:string] : any}){
    const { sessionToken, name, rols, user_id, username  } = props;

    if(!sessionToken) return ['Token is required', undefined];

    if(!name) return ['Name is required', undefined];

    if(!rols) return ['Rols is required', undefined];

    if(!user_id) return ['User id is required', undefined];

    if(!username) return ['Username is required', undefined];



    return [undefined, new CredentialEntity(sessionToken, name, rols, user_id, username)];
  }


}
