import { inject, Injectable, Output } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { OutputActions } from './output.actions';
import { OutputEntity } from '../../../../domain/entities/inventory/output.entity';
import { StatusAction } from '../../../enums/Status.enum';
import { CreateOutputService } from '../../../../domain/use-cases/inventory/outputs/create-output.service';
import { GetOutputService } from '../../../../domain/use-cases/inventory/outputs/get-output.service';
import { GetOutputsService } from '../../../../domain/use-cases/inventory/outputs/get-outputs.service';
import { DeleteOutputService } from '../../../../domain/use-cases/inventory/outputs/delete-output.service';
import { timer } from 'rxjs';

export interface OutputStateModel {
  outputs : OutputEntity[];
  outputById : OutputEntity | null;
  status : StatusAction;
}

@State<OutputStateModel>({
  name: 'output',
  defaults: {
    outputs : [],
    outputById : null,
    status : StatusAction.INITIAL,
  }
})
@Injectable()
export class OutputState {
  private readonly createOutputUseCase = inject(CreateOutputService);
  private readonly getOutputUseCase = inject(GetOutputService);
  private readonly getOutputsUseCase = inject(GetOutputsService);
  private readonly deleteOutputUseCase = inject(DeleteOutputService);



  @Action(OutputActions.Get)
  async get(ctx: StateContext<OutputStateModel>, action: OutputActions.Get) {
    ctx.patchState({ status : StatusAction.LOADING });
    const output = await this.getOutputUseCase.execute(action.output_id);
    ctx.patchState({
      status : StatusAction.SUCCESS,
      outputById : output ? output : null,
    });
    this.setInitialState(ctx);
  }



  @Action(OutputActions.GetAll)
  async getAll(
    ctx: StateContext<OutputStateModel>,
    action: OutputActions.GetAll
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const outputs = await this.getOutputsUseCase.execute(action.params);
    ctx.patchState({ outputs, status: StatusAction.INITIAL });
    // return dispatch;
  }

  @Action(OutputActions.Create)
  async create(
    ctx: StateContext<OutputStateModel>,
    action: OutputActions.Create
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const output = await this.createOutputUseCase.execute(action.dto);
    ctx.patchState({
      status: StatusAction.SUCCESS,
      outputs: [...ctx.getState().outputs, output],
    });
    this.setInitialState(ctx);
  }


  @Action(OutputActions.Delete)
  async delete(
    ctx : StateContext<OutputStateModel>,
    action : OutputActions.Delete
  ){
    ctx.patchState({status : StatusAction.LOADING});
    await this.deleteOutputUseCase.execute(action.id);
    const outputs = ctx.getState().outputs.filter((output) => output.output_id !== action.id);
    this.setInitialState(ctx);
  }


  setInitialState(ctx: StateContext<OutputStateModel>) {
    timer(2000).subscribe(() => {
      ctx.patchState({ status: StatusAction.INITIAL });
    });
  }



}
