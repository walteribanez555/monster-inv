import { Injectable } from '@angular/core';
import { CreatePreparationDTO } from '../../../dtos/process/preparations/create-preparation.dto';
import { PreparationEntity } from '../../../entities/process/preparation.entity';
import { PreparationRepository } from '../../../repositories/process/preparation.repository';



export interface CreatePreparationUseCase {
  execute( dto : CreatePreparationDTO) : Promise<PreparationEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CreatePreparationService implements CreatePreparationUseCase {

  constructor(
    private repository : PreparationRepository
  ) { }
  async execute(dto: CreatePreparationDTO): Promise<PreparationEntity> {
   return this.repository.create(dto);
  }

}
