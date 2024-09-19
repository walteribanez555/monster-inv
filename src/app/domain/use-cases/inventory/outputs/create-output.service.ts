import { Injectable } from '@angular/core';
import { CreateOutputDto } from '../../../dtos/inventory/outputs/create-output.dto';
import { OutputEntity } from '../../../entities/inventory/output.entity';
import { OutputRepository } from '../../../repositories/inventory/output.repository';


export interface CreateOutputUseCase {
  execute ( dto : CreateOutputDto) : Promise<OutputEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateOutputService implements CreateOutputUseCase {

  constructor(
    private repository : OutputRepository

  ) { }
  async execute(dto: CreateOutputDto): Promise<OutputEntity> {
    return this.repository.create(dto);
  }

}
