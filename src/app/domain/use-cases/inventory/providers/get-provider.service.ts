import { Injectable } from '@angular/core';
import { ProviderEntity } from '../../../entities/inventory/provider.entity';
import { ProviderRepository } from '../../../repositories/inventory/provider.repository';


export interface GetProviderUseCase {
  execute( id : number) : Promise<ProviderEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetProviderService  implements GetProviderUseCase{

  constructor(
    private repository : ProviderRepository,
  ) { }
  execute(id: number): Promise<ProviderEntity[]> {
    return this.repository.get(id);
  }

}
