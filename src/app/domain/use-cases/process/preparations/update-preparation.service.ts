import { Injectable } from '@angular/core';
import { UpdatePreparationDTO } from '../../../dtos/process/preparations/update-preparation.dto';
import { PreparationEntity } from '../../../entities/process/preparation.entity';
import { PreparationRepository } from '../../../repositories/process/preparation.repository';


export interface UpdatePreparationUseCase {
  execute( dto : UpdatePreparationDTO) : Promise<PreparationEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdatePreparationService implements UpdatePreparationUseCase {

  constructor(
    private repository : PreparationRepository
  ) { }
  execute(dto: UpdatePreparationDTO): Promise<PreparationEntity> {
    return this.repository.update(dto);
  }

}
