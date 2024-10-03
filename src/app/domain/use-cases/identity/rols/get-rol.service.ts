import { Injectable } from '@angular/core';
import { RolEntity } from '../../../entities/identity/rol.entity';
import { RolRepository } from '../../../repositories/identity/rol.repository';

export interface GetRolUseCase {
  execute(id: number): Promise<RolEntity>;
}

@Injectable({
  providedIn: 'root',
})
export class GetRolService implements GetRolUseCase {
  constructor(private repository: RolRepository) {}
  execute(id: number): Promise<RolEntity> {
    return this.repository.getRol(id);
  }
}
