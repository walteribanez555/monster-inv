import { CreateWarehouseDto } from '../../dtos/inventory/warehouses/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../dtos/inventory/warehouses/update-warehouse.dto';
import { WarehouseEntity } from '../../entities/inventory/warehouse.entity';

export abstract class WarehouseRepository {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  abstract create(dto: CreateWarehouseDto): Promise<WarehouseEntity>;
  abstract update(dto: UpdateWarehouseDto): Promise<WarehouseEntity>;
  abstract get(id: number): Promise<WarehouseEntity[]>;
  abstract getAll(): Promise<WarehouseEntity[]>;
  abstract delete(id: number): Promise<WarehouseEntity[]>;
}
