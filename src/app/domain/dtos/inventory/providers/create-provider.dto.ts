export class CreateProviderDto {
  constructor (
    public readonly name : string,
    public readonly phone : string,
    public readonly email : string,
    public readonly address : string,
    public readonly status : number,
  ) {

  }



  public static create(props : {[key : string] : any}) {
    const { name , phone, email , address , status } = props;

    if( !name ) return ['Name Property is Required', undefined];
    if( !phone) return ['Phone Property is Required', undefined];
    if( !email ) return['Email Property is Required', undefined];
    if( !address ) return['Address Property is Required', undefined];
    if( !status ) return['Status Property is Required', undefined];


    return [null, new CreateProviderDto(name, phone, email, address, status)];

  }



}
