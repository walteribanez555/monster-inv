import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { StatusAction } from '../enums/Status.enum';
import { WarehouseSelectors } from '../states/warehouse/warehouse.queries';
import { WarehouseEntity } from '../../domain/entities/inventory/warehouse.entity';
import { WarehouseActions } from '../states/warehouse/warehouse.actions';
import { CreateWarehouseDto } from '../../domain/dtos/inventory/warehouses/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../domain/dtos/inventory/warehouses/update-warehouse.dto';

@Injectable({
  providedIn: 'root',
})
export class WarehouseFacadeService {
  private _store = inject(Store);

  statusAction: Signal<StatusAction> = this._store.selectSignal(
    WarehouseSelectors.getStatus
  );

  warehouses: Signal<WarehouseEntity[]> = this._store.selectSignal(
    WarehouseSelectors.getWarehouses
  );

  constructor() {
    this._store.dispatch(new WarehouseActions.GetAll());
  }

  addItem(name: string, status: number) {
    const [response, dto] = CreateWarehouseDto.create({ name, status });

    if (response) {
      throw new Error('Error al crear la sucursal : ' + response);
    }

    this._store.dispatch(
      new WarehouseActions.Create(dto as CreateWarehouseDto)
    );
  }

  updateItem(warehouse_id: number, name: string, status: number) {
    const [err, dto] = UpdateWarehouseDto.create({
      name,
      status,
      warehouse_id,
    });

    if (err)
      throw new Error('Error al actualizar la sucursal : ' + err);

    this._store.dispatch(
      new WarehouseActions.Update(dto as UpdateWarehouseDto)
    );
  }

  deleteItem(warehouse_id: number) {
    this._store.dispatch(new WarehouseActions.Delete(warehouse_id));
  }

  getWarehouse(warehouse_id: number) {
    this._store.dispatch(new WarehouseActions.Get(warehouse_id));
  }

  getWarehouses() {
    this._store.dispatch(new WarehouseActions.GetAll());
  }
}
