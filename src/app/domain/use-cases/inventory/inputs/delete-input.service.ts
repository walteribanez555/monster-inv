import { Injectable } from '@angular/core';
import { InputRepository } from '../../../repositories/inventory/input.repository';


export interface DeleteInputUseCase{
   execute( id : number) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteInputService implements DeleteInputUseCase {

  constructor(
    private repository  : InputRepository

  ) { }
 async execute(id: number): Promise<any> {
      return this.repository.delete(id);
  }

}
