import { Injectable } from '@angular/core';
import { RolRepository } from '../../../repositories/identity/rol.repository';

export interface DeleteRolUseCase {
  execute(id: number): any;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteRolsService implements DeleteRolUseCase {
  constructor(private repository: RolRepository) {}
  execute(id: number) {
    return this.repository.deleteRol(id);
  }
}
