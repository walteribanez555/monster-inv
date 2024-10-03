import { Injectable } from '@angular/core';
import { CreateUserDto } from '../../../dtos/identity/user/create-user.dto';
import { UserRepository } from '../../../repositories/identity/user.repository';
import { UserEntity } from '../../../entities/identity/user.entity';

export interface CreateUserUseCase {
  execute( dto : CreateUserDto): Promise<UserEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserService implements CreateUserUseCase {

  constructor(
    private repository : UserRepository
  ) { }
  execute(dto: CreateUserDto) : Promise<UserEntity> {
    return this.repository.createUser(dto);
  }


}
