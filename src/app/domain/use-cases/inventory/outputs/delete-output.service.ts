
import { Injectable } from '@angular/core';
import { OutputRepository } from '../../../repositories/inventory/output.repository';



export interface DeleteOutputUseCase {
  execute( id : number) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteOutputService implements DeleteOutputUseCase {

  constructor(
    private repository : OutputRepository
  ) { }
  execute(id: number): Promise<any> {
    return this.repository.delete(id);
  }

}
