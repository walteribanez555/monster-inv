import { Injectable } from '@angular/core';
import { WarehouseRepository } from '../../../repositories/inventory/warehouse.repository';


export interface DeleteWarehouseUseCase {
  execute( id : number) : Promise<any>;
}



@Injectable({
  providedIn: 'root'
})
export class DeleteWarehouseService implements DeleteWarehouseUseCase {

  constructor(
    private repository  : WarehouseRepository
  ) { }
  execute(id: number): Promise<any> {
    return this.repository.delete(id);
  }

}
