import { Injectable } from '@angular/core';
import { UserEntity } from '../../../entities/identity/user.entity';
import { UserRepository } from '../../../repositories/identity/user.repository';


export interface GetUserUseCase {
  execute(username : string) : Promise<UserEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class GetUserService implements GetUserUseCase {

  constructor(
    private repository : UserRepository
  ) { }
  execute(username: string): Promise<UserEntity> {
    return this.repository.getUser(username);
  }

}
