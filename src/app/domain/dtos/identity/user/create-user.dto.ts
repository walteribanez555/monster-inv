export class CreateUserDto {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly confirm: string,
    public readonly status: number,
    public readonly rols: string,
    public readonly name: string
  ) {}

  public static create(props: { [key: string]: any }) {
    const { username, password, confirm, status, roles, name } = props;

    if (!username) return ['Username is required', undefined];

    if (!password) return ['Password is required', undefined];

    if (!confirm) return ['Passsword confirmation is required', undefined];

    if (!status) return ['Status is required', undefined];

    if (!name) return ['Name is required', undefined];

    if(!roles) return ['Rols is required', undefined];

    return [
      undefined,
      new CreateUserDto(username, password, confirm, status, roles, name),
    ];
  }
}
