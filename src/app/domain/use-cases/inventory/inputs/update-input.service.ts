
import { Injectable } from '@angular/core';
import { UpdateInputDto } from '../../../dtos/inventory/inputs/update-input.dto';
import { InputEntity } from '../../../entities/inventory/input.entity';


export interface UpdateInputUseCase {
  execute( dto : UpdateInputDto) : Promise<any>;
}


@Injectable({
  providedIn: 'root'
})
export class UpdateInputService implements UpdateInputUseCase {

  constructor() { }
  execute(dto: UpdateInputDto): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
