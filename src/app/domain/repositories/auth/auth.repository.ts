import { LoginDto } from "../../dtos/auth/login.dto";
import { LogoutDto } from "../../dtos/auth/logout.dto";
import { CredentialEntity } from "../../entities/auth/credential.entity";

export abstract class AuthRepository {
  protected readonly authUrl: string;
  constructor(identityUrl: string) {
    this.authUrl = identityUrl;
  }

  abstract login(  dto : LoginDto ) : Promise<CredentialEntity>;

  abstract logout( ) : Promise<any>;


}
