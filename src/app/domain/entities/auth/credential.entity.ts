export class CredentialEntity {
  constructor(
    public readonly token : string,

  ) {

  }


  public static fromObject( props : {[key:string] : any}){
    const { token } = props;

    if(!token) return ['Token is required', undefined];

    return [undefined, new CredentialEntity(token)];
  }


}
