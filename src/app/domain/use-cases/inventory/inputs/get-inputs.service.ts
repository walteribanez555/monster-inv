import { Injectable } from '@angular/core';
import { InputEntity } from '../../../entities/inventory/input.entity';
import { InputRepository } from '../../../repositories/inventory/input.repository';


export interface GetInputsUseCase{
  execute(params : {[key:string] : any}) : Promise<InputEntity[]>;
}


@Injectable({
  providedIn: 'root'
})
export class GetInputsService implements GetInputsUseCase {

  constructor(
    private repository : InputRepository
  ) { }
  execute(params : {[key:string] : any}): Promise<InputEntity[]> {
    return this.repository.getAll(params);
  }

}
