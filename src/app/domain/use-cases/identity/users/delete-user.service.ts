import { Injectable } from '@angular/core';
import { UserRepository } from '../../../repositories/identity/user.repository';


export interface DeleteUserUseCase {
  execute( username : string)  : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService implements DeleteUserUseCase {

  constructor(
    private repository : UserRepository
  ) { }
  execute(username : string): Promise<any> {
    return this.repository.deleteUser(username);
  }

}
