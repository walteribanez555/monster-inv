import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProviderEntity } from '../../../../domain/entities/inventory/provider.entity';
import { StatusAction } from '../../../enums/Status.enum';
import { CreateProviderService } from '../../../../domain/use-cases/inventory/providers/create-provider.service';
import { UpdateProviderService } from '../../../../domain/use-cases/inventory/providers/update-provider.service';
import { DeleteProviderService } from '../../../../domain/use-cases/inventory/providers/delete-provider.service';
import { GetProviderService } from '../../../../domain/use-cases/inventory/providers/get-provider.service';
import { GetProvidersService } from '../../../../domain/use-cases/inventory/providers/get-providers.service';
import { WarehouseActions } from '../warehouse/warehouse.actions';
import { ProviderActions } from './provider.actions';
import { timer } from 'rxjs';

export interface ProviderStateModel {
  providers : ProviderEntity[];
  providerById: ProviderEntity | null;
  status : StatusAction;
}

@State<ProviderStateModel>({
  name: 'provider',
  defaults: {
    providers : [],
    providerById: null,
    status : StatusAction.INITIAL
  }
})
@Injectable()
export class ProviderState {

  private readonly createProviderUseCase = inject(CreateProviderService);
  private readonly updateProviderUseCase = inject(UpdateProviderService);
  private readonly deleteProviderUseCase = inject(DeleteProviderService);
  private readonly getProviderUseCase = inject(GetProviderService);
  private readonly getProvidersUseCase = inject(GetProvidersService);


  @Action(ProviderActions.Get)
  async get(
    ctx : StateContext<ProviderStateModel>,
    action : ProviderActions.Get
  ){
    ctx.patchState({ status : StatusAction.LOADING });
    const provider = await this.getProviderUseCase.execute(action.provider_id);
    ctx.patchState({
      status : StatusAction.SUCCESS,
      providerById : provider[0] ? provider[0] : null
    });
    this.setInitialState(ctx);
  }

  @Action(ProviderActions.GetAll)
  async getAll(ctx : StateContext<ProviderStateModel>){
    ctx.patchState({ status : StatusAction.LOADING });
    const providers = await this.getProvidersUseCase.execute();
    console.log({providers});
    ctx.patchState({ providers, status : StatusAction.INITIAL });
  }


  @Action(ProviderActions.Create)
  async create(
    ctx : StateContext<ProviderStateModel>,
    action : ProviderActions.Create
  ){
    ctx.patchState({ status : StatusAction.LOADING });
    const provider = await this.createProviderUseCase.execute(action.dto);
    ctx.patchState({
      status : StatusAction.SUCCESS,
      providers : [...ctx.getState().providers, provider]
    });
    this.setInitialState(ctx);
  }

  @Action(ProviderActions.Update)
  async update(
    ctx : StateContext<ProviderStateModel>,
    action : ProviderActions.Update
  ){
    ctx.patchState({ status : StatusAction.LOADING });
    const provider = await this.updateProviderUseCase.execute(action.dto);

    const providers = ctx
      .getState()
      .providers.map((p) =>
        p.provider_id === action.dto.provider_id ? provider : p
      );

    ctx.patchState({
      status : StatusAction.SUCCESS,
      providers
    });



    this.setInitialState(ctx);
  }

  @Action(ProviderActions.Delete)
  async delete(
    ctx : StateContext<ProviderStateModel>,
    action : ProviderActions.Delete
  ){
    ctx.patchState({ status : StatusAction.LOADING });
    await this.deleteProviderUseCase.execute(action.provider_id);

    const providers = ctx
      .getState()
      .providers.filter((p) => p.provider_id !== action.provider_id);

    ctx.patchState({
      status : StatusAction.SUCCESS,
      providers
    });

    this.setInitialState(ctx);
  }


  setInitialState(ctx: StateContext<ProviderStateModel>) {
    timer(2000).subscribe(() => {
      ctx.patchState({ status: StatusAction.INITIAL });
    });
  }

}
