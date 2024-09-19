import { Injectable } from '@angular/core';
import { OutputEntity } from '../../../entities/inventory/output.entity';
import { OutputRepository } from '../../../repositories/inventory/output.repository';


export interface GetOutputsUseCase{
   execute( params: {[key:string] : any}) : Promise<OutputEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetOutputsService  implements GetOutputsUseCase{

  constructor(
    private repository : OutputRepository
  ) { }
  execute(params : {[key:string]:any}): Promise<OutputEntity[]> {
    return this.repository.getAll(params);
  }

}
