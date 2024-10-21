import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { PreparationEntity } from '../../../../domain/entities/process/preparation.entity';
import { StatusAction } from '../../../enums/Status.enum';
import { PreparationActions } from './preparation.actions';
import { CreatePreparationService } from '../../../../domain/use-cases/process/preparations/create-preparation.service';
import { GetPreparationService } from '../../../../domain/use-cases/process/preparations/get-preparation.service';
import { GetPreparationsService } from '../../../../domain/use-cases/process/preparations/get-preparations.service';
import { UpdatePreparationService } from '../../../../domain/use-cases/process/preparations/update-preparation.service';
import { DeletePreparationsService } from '../../../../domain/use-cases/process/preparations/delete-preparations.service';

export interface PreparationStateModel {
  preparations: PreparationEntity[];
  preparatioById: PreparationEntity | null;
  status: StatusAction;
}

@State<PreparationStateModel>({
  name: 'preparation',
  defaults: {
    preparations: [],
    preparatioById: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class PreparationState {
  private createPreparationUseCase = inject(CreatePreparationService);
  private getPreparationUseCase = inject(GetPreparationService);
  private getPreparationsUseCase = inject(GetPreparationsService);
  private updatePreparationUseCase = inject(UpdatePreparationService);
  private deletePreparationUseCase = inject(DeletePreparationsService);

  @Action(PreparationActions.Create)
  async create(
    ctx: StateContext<PreparationStateModel>,
    action: PreparationActions.Create
  ) {
    ctx.patchState({
      status: StatusAction.LOADING,
    });

    try {
      const item = await this.createPreparationUseCase.execute(action.dto);

      ctx.patchState({
        preparations: [...ctx.getState().preparations, item],
      });

      action.callback?.onResult(item);
    } catch (err) {
      action.callback?.onError(err);
    }

    ctx.patchState({
      status: StatusAction.INITIAL
    })
  }

  @Action(PreparationActions.Get)
  async get(
    ctx: StateContext<PreparationStateModel>,
    action: PreparationActions.Get
  ) {

    ctx.patchState({
      status : StatusAction.LOADING
    });

    try {
      const item = await this.getPreparationUseCase.execute(action.id);

      ctx.patchState({
        preparatioById : item,
      })

      action.callback?.onResult(item);


    }catch( err) {
      action.callback?.onError(err);
    }

    ctx.patchState({
      status: StatusAction.INITIAL
    })


  }

  @Action(PreparationActions.GetAll)
  async getAll(
    ctx: StateContext<PreparationStateModel>,
    action: PreparationActions.GetAll
  ) {

    ctx.patchState({
      status : StatusAction.LOADING
    })

    try {

      const items = await this.getPreparationsUseCase.execute(action.params);

      ctx.patchState({
        preparations: items,
      });


      action.callback?.onResult(items);

    }catch( err ) {

      action.callback?.onError(err);
    }

    ctx.patchState({
      status: StatusAction.INITIAL
    })


  }

  @Action(PreparationActions.Update)
  async update(
    ctx: StateContext<PreparationStateModel>,
    action: PreparationActions.Update
  ) {


    ctx.patchState({
      status : StatusAction.LOADING
    })

    try {
      const itemUpdated = await  this.updatePreparationUseCase.execute(action.dto);


      //To Realize the Update Action




    }catch(err) {

      action.callback?.onError(err);

    }

    ctx.patchState({
      status: StatusAction.INITIAL
    })



  }

  @Action(PreparationActions.Delete)
  async delete(
    ctx: StateContext<PreparationStateModel>,
    action: PreparationActions.Delete
  ) {

    ctx.patchState({
      status :StatusAction.LOADING
    })

    try {
      await this.deletePreparationUseCase.execute(action.id);

      //To Realize the delete action



    }catch( err ) {
      action.callback?.onError(err);
    }



    ctx.patchState({
      status : StatusAction.INITIAL
    })



  }
}
