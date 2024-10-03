import { Injectable } from '@angular/core';
import { LoginDto } from '../../dtos/auth/login.dto';
import { CredentialEntity } from '../../entities/auth/credential.entity';
import { AuthRepository } from '../../repositories/auth/auth.repository';


export interface LoginUseCase {
  execute ( dto : LoginDto ) : Promise<CredentialEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements LoginUseCase {

  constructor(
    private repository : AuthRepository
  ) { }
  execute(dto: LoginDto): Promise<CredentialEntity> {
    return this.repository.login(dto);
  }

}
