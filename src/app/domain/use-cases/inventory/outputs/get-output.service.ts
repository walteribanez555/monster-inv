import { Injectable } from '@angular/core';
import { OutputEntity } from '../../../entities/inventory/output.entity';
import { OutputRepository } from '../../../repositories/inventory/output.repository';


export interface GetOutputUseCase {
  execute( id : number) : Promise<OutputEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class GetOutputService implements GetOutputUseCase {

  constructor(
    private repository: OutputRepository
  ) { }
  execute(id: number): Promise<OutputEntity> {
    return this.repository.get(id);
  }

}
