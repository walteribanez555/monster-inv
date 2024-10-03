export class LoginDto {
  constructor(
    public readonly username :string,
    public readonly password :string,
  ){}


  public static create(props : {[key : string] : any}) {

    const { username, password } = props;

    if(!username) return ['Username is required' , undefined];
    if(!password) return ['Password is required' , undefined];


    return [null, new LoginDto(username, password)];
  }


}
