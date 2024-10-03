import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { StatusAction } from '../../enums/Status.enum';
import { ProviderSelectors } from '../../states/inventory/provider/provider.queries';
import { ProviderEntity } from '../../../domain/entities/inventory/provider.entity';
import { ProviderActions } from '../../states/inventory/provider/provider.actions';
import { CreateWarehouseDto } from '../../../domain/dtos/inventory/warehouses/create-warehouse.dto';
import { CreateProviderDto } from '../../../domain/dtos/inventory/providers/create-provider.dto';
import { UpdateProviderDto } from '../../../domain/dtos/inventory/providers/update-provider.dto';

@Injectable({
  providedIn: 'root',
})
export class ProviderFacadeService {
  private _store = inject(Store);

  statusAction: Signal<StatusAction> = this._store.selectSignal(
    ProviderSelectors.getStatus
  );

  providers: Signal<ProviderEntity[]> = this._store.selectSignal(
    ProviderSelectors.getProviders
  );

  constructor() {
    this._store.dispatch(new ProviderActions.GetAll());
  }

  addItem(
    name: string,
    phone: string,
    email: string,
    address: string,
    status: number
  ) {
    const [error, dto] = CreateProviderDto.create({
      name,
      phone,
      email,
      address,
      status,
    });

    if (error) {
      throw new Error('Error al crear el proveedor : ' + error);
    }

    this._store.dispatch(new ProviderActions.Create(dto as CreateProviderDto));
  }

  updateItem(
    provider_id: number,
    name: string,
    phone: string,
    email: string,
    address: string,
    status: number
  ) {
    const [error, dto] = UpdateProviderDto.create({
      provider_id,
      name,
      phone,
      email,
      address,
      status,
    });

    if (error) {
      throw new Error('Error al actualizar el proveedor : ' + error);

    }

    this._store.dispatch(new ProviderActions.Update(dto as UpdateProviderDto));
  }

  deleteItem(provider_id: number) {
    this._store.dispatch(new ProviderActions.Delete(provider_id));
  }

  getProvider(provider_id: number) {
    this._store.dispatch(new ProviderActions.Get(provider_id));
  }

  getProviders() {
    this._store.dispatch(new ProviderActions.GetAll());
  }
}
