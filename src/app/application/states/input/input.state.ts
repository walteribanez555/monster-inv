import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { InputActions } from './input.actions';
import { InputEntity } from '../../../domain/entities/inventory/input.entity';
import { StatusAction } from '../../enums/Status.enum';
import { CreateInputService } from '../../../domain/use-cases/inventory/inputs/create-input.service';
import { GetInputService } from '../../../domain/use-cases/inventory/inputs/get-input.service';
import { GetInputsService } from '../../../domain/use-cases/inventory/inputs/get-inputs.service';
import { DeleteInputService } from '../../../domain/use-cases/inventory/inputs/delete-input.service';
import { timer } from 'rxjs';

export interface InputStateModel {
  inputs: InputEntity[];
  inputById: InputEntity | null;
  status: StatusAction;
}

@State<InputStateModel>({
  name: 'input',
  defaults: {
    inputs: [],
    inputById: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class InputState {
  private readonly createInputUseCase = inject(CreateInputService);
  private readonly getInputUseCase = inject(GetInputService);
  private readonly getInputsUseCase = inject(GetInputsService);
  private readonly deleteInputUseCase = inject(DeleteInputService);

  @Action(InputActions.Get)
  async get(ctx: StateContext<InputStateModel>, action: InputActions.Get) {
    ctx.patchState({ status: StatusAction.LOADING });
    const input = await this.getInputUseCase.execute(action.input_id);
    ctx.patchState({
      status: StatusAction.SUCCESS,
      inputById: input ? input : null,
    });
    this.setInitialState(ctx);
  }

  @Action(InputActions.GetAll)
  async getAll(
    ctx: StateContext<InputStateModel>,
    action: InputActions.GetAll
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const inputs = await this.getInputsUseCase.execute(action.params);
    ctx.patchState({ inputs, status: StatusAction.INITIAL });
  }

  @Action(InputActions.Create)
  async create(
    ctx: StateContext<InputStateModel>,
    action: InputActions.Create
  ) {
    ctx.patchState({ status: StatusAction.LOADING });
    const input = await this.createInputUseCase.execute(action.dto);
    ctx.patchState({
      status: StatusAction.SUCCESS,
      inputs: [...ctx.getState().inputs, input],
    });

    this.setInitialState(ctx);
  }

  @Action(InputActions.Delete)
  async delete(
    ctx : StateContext<InputStateModel>,
    action : InputActions.Delete
  ){
    ctx.patchState({status : StatusAction.LOADING});
    await this.deleteInputUseCase.execute(action.id);
    ctx.patchState({
      status : StatusAction.SUCCESS,
      inputs : ctx.getState().inputs.filter( input => input.input_id !== action.id)
    });
    this.setInitialState(ctx);
  }



  setInitialState(ctx: StateContext<InputStateModel>) {
    timer(2000).subscribe(() => {
      ctx.patchState({ status: StatusAction.INITIAL });
    });
  }
}
