import { Injectable } from '@angular/core';
import { UpdateWarehouseDto } from '../../../dtos/inventory/warehouses/update-warehouse.dto';
import { WarehouseRepository } from '../../../repositories/inventory/warehouse.repository';
import { WarehouseEntity } from '../../../entities/inventory/warehouse.entity';

export interface UpdateWarehouseUseCase {
  execute( dto : UpdateWarehouseDto ) : Promise<any>;
}


@Injectable({
  providedIn: 'root'
})
export class UpdateWarehouseService  implements UpdateWarehouseUseCase {

  constructor(
    private repository : WarehouseRepository,

  ) { }
  execute(dto: UpdateWarehouseDto): Promise<WarehouseEntity> {
    return this.repository.update(dto);
  }

}
