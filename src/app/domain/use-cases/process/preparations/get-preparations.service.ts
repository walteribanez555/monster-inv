import { Injectable } from '@angular/core';
import { PreparationEntity } from '../../../entities/process/preparation.entity';
import { PreparationRepository } from '../../../repositories/process/preparation.repository';


export interface GetPreparationsUseCase {
  execute( params : {[key:string] : any }) : Promise<PreparationEntity[]>
}

@Injectable({
  providedIn: 'root'
})
export class GetPreparationsService implements GetPreparationsUseCase {

  constructor(
    private repository : PreparationRepository
  ) { }
  execute(params: { [key: string]: any; }): Promise<PreparationEntity[]> {
    return this.repository.getAll(params);
  }

}
