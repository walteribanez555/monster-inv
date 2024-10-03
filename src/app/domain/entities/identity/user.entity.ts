export class UserEntity {
  constructor(
    public readonly user_id: number,
    public readonly username: string,
    public readonly name: string,
    public readonly rols: string,
    public readonly status: number
  ) {}

  public static fromObject(props: { [key: string]: any }) {
    const { user_id, status, username, name, rols } = props;


    if (!user_id) return ['User id is required', undefined];
    if (!username) return ['Username is required', undefined];
    if (!name) return ['Name is required', undefined];
    if (!rols) return ['Rols is required', undefined];
    if (!status) return ['Status is required', undefined];


    console.log("valido componente");
    return [
      undefined,
      new UserEntity(user_id, username, name, rols, status),
    ];
  }
}
