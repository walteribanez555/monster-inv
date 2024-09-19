import { Injectable } from '@angular/core';
import { InputEntity } from '../../../entities/inventory/input.entity';
import { InputRepository } from '../../../repositories/inventory/input.repository';


export interface GetInputUseCase {
  execute( id : number) : Promise<InputEntity>;
}



@Injectable({
  providedIn: 'root'
})
export class GetInputService implements GetInputUseCase {

  constructor(
    private repository : InputRepository
  ) { }
  async execute(id: number): Promise<InputEntity> {
      return this.repository.get(id);
  }

}
