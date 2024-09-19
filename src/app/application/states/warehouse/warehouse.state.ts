import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { WarehouseEntity } from '../../../domain/entities/inventory/warehouse.entity';
import { StatusAction } from '../../enums/Status.enum';
import { WarehouseActions } from './warehouse.actions';
import { CreateWarehouseService } from '../../../domain/use-cases/inventory/warehouses/create-warehouse.service';
import { UpdateWarehouseService } from '../../../domain/use-cases/inventory/warehouses/update-warehouse.service';
import { GetWarehouseService } from '../../../domain/use-cases/inventory/warehouses/get-warehouse.service';
import { GetWarehousesService } from '../../../domain/use-cases/inventory/warehouses/get-warehouses.service';
import { DeleteWarehouseService } from '../../../domain/use-cases/inventory/warehouses/delete-warehouse.service';
import { timer } from 'rxjs';

export interface WarehouseStateModel {
  warehouses: WarehouseEntity[];
  warehouseById: WarehouseEntity | null;
  status: StatusAction;
}

@State<WarehouseStateModel>({
  name: 'warehouse',
  defaults: {
    warehouses: [],
    warehouseById: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class WarehouseState {
  private readonly createWarehouseUseCase = inject(CreateWarehouseService);
  private readonly updateWarehouseUseCase = inject(UpdateWarehouseService);
  private readonly deleteWarehouseUseCase = inject(DeleteWarehouseService);
  private readonly getWarehouseUseCase = inject(GetWarehouseService);
  private readonly getWarehousesUseCase = inject(GetWarehousesService);

  @Action(WarehouseActions.Get)
  async get(
    ctx: StateContext<WarehouseStateModel>,
    action: WarehouseActions.Get
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const warehouseId = await this.getWarehouseUseCase.execute(
      action.warehouse_id
    );
    ctx.patchState({
      status: StatusAction.SUCCESS,
      warehouseById: warehouseId[0] ? warehouseId[0] : null,
    });
    this.setInitialState(ctx);
  }

  @Action(WarehouseActions.GetAll)
  async getAll(ctx: StateContext<WarehouseStateModel>) {
    ctx.patchState({ status: StatusAction.LOADING });
    const warehouses = await this.getWarehousesUseCase.execute();

    ctx.patchState({ warehouses, status: StatusAction.INITIAL });
  }

  @Action(WarehouseActions.Create)
  async create(
    ctx: StateContext<WarehouseStateModel>,
    action: WarehouseActions.Create
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const warehouse = await this.createWarehouseUseCase.execute(action.dto);
    ctx.patchState({
      status: StatusAction.SUCCESS,
      warehouses: [...ctx.getState().warehouses, warehouse],
    });

    this.setInitialState(ctx);
  }

  @Action(WarehouseActions.Update)
  async update(
    ctx: StateContext<WarehouseStateModel>,
    action: WarehouseActions.Update
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const updatedWarehouse = await this.updateWarehouseUseCase.execute(action.dto);


    const warehouses = ctx
    .getState()
    .warehouses.map((w) =>
      w.warehouse_id === action.dto.warehouse_id ? updatedWarehouse : w
    )

    if(!warehouses.includes(updatedWarehouse)){
      warehouses.push(updatedWarehouse);
    }

    ctx.patchState({
      status: StatusAction.SUCCESS,
      warehouses : warehouses,
    });

    this.setInitialState(ctx);
  }

  @Action(WarehouseActions.Delete)
  async delete(
    ctx: StateContext<WarehouseStateModel>,
    action: WarehouseActions.Delete
  ) {
    ctx.patchState({status : StatusAction.LOADING});
    await this.deleteWarehouseUseCase.execute(action.warehouse_id);
    const warehouses = ctx
      .getState()
      .warehouses.filter((w) => w.warehouse_id !== action.warehouse_id);

    ctx.patchState({
      warehouses,
      status: StatusAction.SUCCESS,
    })

    this.setInitialState(ctx);
  }

  setInitialState(ctx: StateContext<WarehouseStateModel>) {
    timer(2000).subscribe(() => {
      ctx.patchState({ status: StatusAction.INITIAL });
    });
  }
}
