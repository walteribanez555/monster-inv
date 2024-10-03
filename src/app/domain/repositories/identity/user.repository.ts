import { CreateUserDto } from "../../dtos/identity/user/create-user.dto";
import { UpdateUserDto } from "../../dtos/identity/user/update-user.dto";
import { UserEntity } from "../../entities/identity/user.entity";


export abstract class UserRepository {
  protected readonly identityUrl: string;
  constructor(identityUrl: string) {
    this.identityUrl = identityUrl;
  }

  abstract getUser( username : string) : Promise<UserEntity>;

  abstract getUsers() : Promise<UserEntity[]>;

  abstract createUser(dto : CreateUserDto) : Promise<UserEntity>;

  abstract updateUser(dto : UpdateUserDto) : Promise<UserEntity>;

  abstract deleteUser(username :string) : Promise<any>;
}
