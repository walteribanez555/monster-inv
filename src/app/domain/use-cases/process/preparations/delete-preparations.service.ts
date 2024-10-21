import { Injectable } from '@angular/core';
import { PreparationEntity } from '../../../entities/process/preparation.entity';
import { PreparationRepository } from '../../../repositories/process/preparation.repository';

export interface DeletePreparationUseCase {
  execute(id: number): Promise<any>;
}

@Injectable({
  providedIn: 'root',
})
export class DeletePreparationsService implements DeletePreparationUseCase {
  constructor(private repository: PreparationRepository) {}
  execute(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
