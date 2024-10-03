import { Injectable } from '@angular/core';
import { AuthRepository } from '../../repositories/auth/auth.repository';
import { LogoutDto } from '../../dtos/auth/logout.dto';


export interface LogoutUseCase {
  execute( ) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class LogoutService implements LogoutUseCase {

  constructor(
    private repository : AuthRepository
  ) { }
  execute(): Promise<any> {
    return this.repository.logout();
  }

}
