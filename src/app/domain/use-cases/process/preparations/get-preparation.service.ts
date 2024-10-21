import { Injectable } from '@angular/core';
import { PreparationEntity } from '../../../entities/process/preparation.entity';
import { PreparationRepository } from '../../../repositories/process/preparation.repository';


export interface GetPreparationUseCase {
  execute( id : number) : Promise<PreparationEntity>;
}


@Injectable({
  providedIn: 'root'
})
export class GetPreparationService implements GetPreparationUseCase {

  constructor(
    private repository : PreparationRepository
  ) { }
  execute(id: number): Promise<PreparationEntity> {
    return this.repository.getById(id);
  }

}
