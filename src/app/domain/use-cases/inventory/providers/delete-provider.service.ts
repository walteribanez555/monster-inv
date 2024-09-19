import { Injectable } from '@angular/core';
import { ProviderRepository } from '../../../repositories/inventory/provider.repository';


export interface DeleteProviderUseCase {
  execute( id : number) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteProviderService implements DeleteProviderUseCase {

  constructor(
    private repository : ProviderRepository,
  ) {

   }
  execute(id: number): Promise<any> {
    return this.repository.delete(id);
  }

}
