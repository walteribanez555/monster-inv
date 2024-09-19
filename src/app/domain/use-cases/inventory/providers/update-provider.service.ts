import { Injectable } from '@angular/core';
import { UpdateProviderDto } from '../../../dtos/inventory/providers/update-provider.dto';
import { ProviderRepository } from '../../../repositories/inventory/provider.repository';
import { ProviderEntity } from '../../../entities/inventory/provider.entity';



export interface UpdateProviderUseCase {
  execute( dto : UpdateProviderDto) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateProviderService implements UpdateProviderUseCase{

  constructor(
    private repository : ProviderRepository

  ) { }
  execute(dto: UpdateProviderDto): Promise<ProviderEntity> {
    return this.repository.update(dto);
  }

}
