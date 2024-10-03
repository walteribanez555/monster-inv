import { Injectable } from '@angular/core';
import { UserEntity } from '../../../entities/identity/user.entity';
import { UserRepository } from '../../../repositories/identity/user.repository';



export interface GetUsersUseCase {
  execute( ) : Promise<UserEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetUsersService implements GetUsersUseCase {

  constructor(
    private repository : UserRepository
  ){}
  execute(): Promise<UserEntity[]> {
    return this.repository.getUsers();
  }



}
