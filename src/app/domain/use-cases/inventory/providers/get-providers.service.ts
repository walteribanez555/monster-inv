import { Injectable } from '@angular/core';
import { ProviderEntity } from '../../../entities/inventory/provider.entity';
import { ProviderRepository } from '../../../repositories/inventory/provider.repository';


export interface GetProvidersUseCase{
  execute( ) : Promise<ProviderEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetProvidersService implements GetProvidersUseCase{

  constructor(
    private repository : ProviderRepository
  ) { }
  execute(): Promise<ProviderEntity[]> {
    return this.repository.getAll();
  }

}
