import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { RolActions } from './rol.actions';
import { RolEntity } from '../../../../domain/entities/identity/rol.entity';
import { StatusAction } from '../../../enums/Status.enum';
import { CreateRolService } from '../../../../domain/use-cases/identity/rols/create-rol.service';
import { GetRolService } from '../../../../domain/use-cases/identity/rols/get-rol.service';
import { GetRolsService } from '../../../../domain/use-cases/identity/rols/get-rols.service';
import { DeleteRolsService } from '../../../../domain/use-cases/identity/rols/delete-rols.service';
import { UpdateRolService } from '../../../../domain/use-cases/identity/rols/update-rol.service';

export interface RolStateModel {
  rols: RolEntity[];
  rolById: RolEntity | null;
  status: StatusAction;
}

@State<RolStateModel>({
  name: 'rol',
  defaults: {
    rols: [],
    rolById: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class RolState {
  private readonly createRolUseCase = inject(CreateRolService);
  private readonly getRolUseCase = inject(GetRolService);
  private readonly getRolsUseCase = inject(GetRolsService);
  private readonly deleteRolUseCase = inject(DeleteRolsService);
  private readonly updateRolUseCase = inject(UpdateRolService);

  @Action(RolActions.Get)
  async get(ctx: StateContext<RolStateModel>, action: RolActions.Get) {
    ctx.patchState({ status: StatusAction.LOADING });
    const rols = await this.getRolUseCase.execute(action.rol_id);
    ctx.patchState({
      status: StatusAction.INITIAL,
      rolById: rols ? rols : null,
    });
  }

  @Action(RolActions.GetAll)
  async getAll(ctx: StateContext<RolStateModel>, action: RolActions.GetAll) {
    ctx.patchState({ status: StatusAction.LOADING });
    const rols = await this.getRolsUseCase.execute();
    ctx.patchState({ rols, status: StatusAction.INITIAL });
  }


  @Action(RolActions.Delete)
  async delete(
    ctx : StateContext<RolStateModel>,
    action  : RolActions.Delete
  ){
    ctx.patchState({status : StatusAction.LOADING});
    await this.deleteRolUseCase.execute(action.id);
    const rols = ctx.getState().rols.filter((rol) => rol.rol_id !== action.id);
  }


  @Action(RolActions.Create)
  async create(
    ctx : StateContext<RolStateModel>,
    action : RolActions.Create
  ){
    ctx.patchState({status : StatusAction.LOADING});

    const rol = await this.createRolUseCase.execute(action.dto);

    ctx.patchState({
      status : StatusAction.SUCCESS,
      rols : [...ctx.getState().rols, rol]
    })
  }


  @Action(RolActions.Update)
  async update(
    ctx : StateContext<RolStateModel>,
    action : RolActions.Update
  ){
    ctx.patchState({status : StatusAction.LOADING});

    const updatedRol = await this.updateRolUseCase.execute(action.dto);

    const rols = ctx.getState().rols.map((rol) => {
      if(rol.rol_id === updatedRol.rol_id){
        return updatedRol;
      }
      return rol;
    });

    ctx.patchState({
      status : StatusAction.SUCCESS,
      rols
    })
  }

}
