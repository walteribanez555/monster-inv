import { CreateRolDto } from "../../dtos/identity/rol/create-rol.dto";
import { UpdateRolDto } from "../../dtos/identity/rol/update-rol.dto";
import { RolEntity } from "../../entities/identity/rol.entity";

export abstract class RolRepository {

  protected readonly identityUrl: string;
  constructor(identityUrl: string) {
    this.identityUrl = identityUrl;
  }

  abstract getRol( id : number) : Promise<RolEntity>;

  abstract getRols() : Promise<RolEntity[]>;

  abstract createRol(dto : CreateRolDto) : Promise<RolEntity>;

  abstract updateRol(dto : UpdateRolDto) : Promise<RolEntity>;

  abstract deleteRol(id : number) : Promise<any>;

}
