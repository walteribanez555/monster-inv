import { Injectable } from '@angular/core';
import { RolEntity } from '../../../entities/identity/rol.entity';
import { RolRepository } from '../../../repositories/identity/rol.repository';
import { UpdateRolDto } from '../../../dtos/identity/rol/update-rol.dto';


export interface UpdateRolUseCase {
  execute( dto : UpdateRolDto) : Promise<RolEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateRolService implements UpdateRolUseCase {

  constructor(
    private repository : RolRepository
  ) { }
  execute(dto: UpdateRolDto): Promise<RolEntity> {
   return this.repository.updateRol(dto);
  }

}
