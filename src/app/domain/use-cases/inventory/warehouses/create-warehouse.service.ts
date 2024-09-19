import { Injectable } from '@angular/core';
import { CreateWarehouseDto } from '../../../dtos/inventory/warehouses/create-warehouse.dto';
import { WarehouseEntity } from '../../../entities/inventory/warehouse.entity';
import { WarehouseRepository } from '../../../repositories/inventory/warehouse.repository';


export interface CreateWarehouseUseCase {
  execute( dto : CreateWarehouseDto) : Promise<WarehouseEntity>;
}



@Injectable({
  providedIn: 'root'
})
export class CreateWarehouseService implements CreateWarehouseUseCase {

  constructor(
    private repository : WarehouseRepository

  ) { }
  async execute(dto: CreateWarehouseDto): Promise<WarehouseEntity> {
    return this.repository.create(dto);
  }

}
