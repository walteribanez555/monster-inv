import { Injectable } from '@angular/core';
import { CreateRolDto } from '../../../dtos/identity/rol/create-rol.dto';
import { RolEntity } from '../../../entities/identity/rol.entity';
import { RolRepository } from '../../../repositories/identity/rol.repository';

export interface CreateRolUseCase {
  execute(dto: CreateRolDto): Promise<RolEntity>;
}

@Injectable({
  providedIn: 'root',
})
export class CreateRolService implements CreateRolUseCase {
  constructor(private repository: RolRepository) {}
  execute(dto: CreateRolDto): Promise<RolEntity> {
    return this.repository.createRol(dto);
  }
}
