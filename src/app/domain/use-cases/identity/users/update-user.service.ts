import { Injectable } from '@angular/core';
import { UpdateUserDto } from '../../../dtos/identity/user/update-user.dto';
import { UserEntity } from '../../../entities/identity/user.entity';
import { UserRepository } from '../../../repositories/identity/user.repository';



export interface UpdateUserUseCase {
  execute(dto : UpdateUserDto) : Promise<UserEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService implements UpdateUserUseCase {

  constructor(
    private repository : UserRepository

  ) { }
  execute(dto: UpdateUserDto): Promise<UserEntity> {
    return this.repository.updateUser(dto);
  }
}
