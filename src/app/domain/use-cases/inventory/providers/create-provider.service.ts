import { Injectable } from '@angular/core';
import { CreateProviderDto } from '../../../dtos/inventory/providers/create-provider.dto';
import { ProviderEntity } from '../../../entities/inventory/provider.entity';
import { ProviderRepository } from '../../../repositories/inventory/provider.repository';


export interface CreateProviderUseCase {
  execute ( dto : CreateProviderDto) : Promise<ProviderEntity>;
}



@Injectable({
  providedIn: 'root'
})
export class CreateProviderService  implements CreateProviderUseCase{

  constructor(
    private repository : ProviderRepository,

  ) { }
  execute(dto: CreateProviderDto): Promise<ProviderEntity> {
    return this.repository.create(dto);
  }

}
