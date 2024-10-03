

export class LogoutDto {
  constructor(
    public readonly token : string,
  ){}


  public static (props : {[key : string] : any}) {

    const { token } = props;

    if(!token) return ['Token is required' , undefined];

    return [null, new LogoutDto(token)];
  }

}
