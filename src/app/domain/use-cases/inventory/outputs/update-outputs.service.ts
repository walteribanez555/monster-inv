import { Injectable } from '@angular/core';
import { UpdateOutputDto } from '../../../dtos/inventory/outputs/update-output.dto';


export interface UpdateOutputUseCase {
  execute( dto : UpdateOutputDto) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateOutputsService implements UpdateOutputUseCase {

  constructor() { }
  execute(dto: UpdateOutputDto): Promise<any> {
    throw new Error('Method not implemented.');
  }


}
