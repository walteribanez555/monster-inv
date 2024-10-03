import { LoginDto } from "../../../../domain/dtos/auth/login.dto";
import { LogoutDto } from "../../../../domain/dtos/auth/logout.dto";
import { CredentialEntity } from "../../../../domain/entities/auth/credential.entity";
import { StateCallback } from "../../StateCallback.interface";

export namespace CredentialActions {

  export class Login {
    static readonly type = '[Credential] Login';
    constructor(public dto : LoginDto, public callback?: StateCallback<CredentialEntity> )  {}
  }

  export class Logout {
    static readonly type = '[Credential] Logout';
    constructor(public callback?: StateCallback<CredentialEntity> ) {}
  }

  export class GetCredentials {
    static readonly type = '[Credential] GetCredentials';
    constructor(public callback?: StateCallback<CredentialEntity> ) {}
  }

  export class ClearCredentials {
    static readonly type = '[Credential] ClearCredentials';
    constructor(public callback?: StateCallback<CredentialEntity> ){}
   }


}
