import { Injectable } from '@angular/core';
import { RolEntity } from '../../../entities/identity/rol.entity';
import { RolRepository } from '../../../repositories/identity/rol.repository';

export interface GetRolsUseCase {
  execute(): Promise<RolEntity[]>;
}

@Injectable({
  providedIn: 'root',
})
export class GetRolsService implements GetRolsUseCase {
  constructor(private repository: RolRepository) {}
  execute(): Promise<RolEntity[]> {
    return this.repository.getRols();
  }
}
