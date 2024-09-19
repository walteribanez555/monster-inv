import { Injectable } from '@angular/core';
import { WarehouseEntity } from '../../../entities/inventory/warehouse.entity';
import { WarehouseRepository } from '../../../repositories/inventory/warehouse.repository';

export interface GetWarehouseUseCase {
  execute( id : number) : Promise<WarehouseEntity[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseService implements GetWarehouseUseCase{

  constructor(
    private repository : WarehouseRepository

  ) { }
  execute(id: number): Promise<WarehouseEntity[]> {
    return this.repository.get(id);
  }

}
