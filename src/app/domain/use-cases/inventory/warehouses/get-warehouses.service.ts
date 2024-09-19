import { Injectable } from '@angular/core';
import { WarehouseEntity } from '../../../entities/inventory/warehouse.entity';
import { WarehouseRepository } from '../../../repositories/inventory/warehouse.repository';

export interface GetWarehousesUseCase{
  execute( ) : Promise<WarehouseEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetWarehousesService  implements GetWarehousesUseCase{

  constructor(
    private repository : WarehouseRepository

  ) { }
  execute(): Promise<WarehouseEntity[]> {
    return this.repository.getAll();

  }

}
