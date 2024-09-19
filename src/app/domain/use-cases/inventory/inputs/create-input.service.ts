import { Injectable } from '@angular/core';
import { InputEntity } from '../../../entities/inventory/input.entity';
import { InputRepository } from '../../../repositories/inventory/input.repository';
import { CreateInputDto } from '../../../dtos/inventory/inputs/create-input.dto';




export interface CreateInputUseCase {
  execute( dto : CreateInputDto) : Promise<InputEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateInputService  implements CreateInputUseCase {

  constructor(private repository : InputRepository) { }


  async execute(dto: CreateInputDto): Promise<InputEntity> {
   return  this.repository.create(dto);
  }

}
