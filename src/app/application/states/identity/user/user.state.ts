import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { UserActions } from './user.actions';
import { UserEntity } from '../../../../domain/entities/identity/user.entity';
import { StatusAction } from '../../../enums/Status.enum';
import { CreateUserService } from '../../../../domain/use-cases/identity/users/create-user.service';
import { UpdateUserService } from '../../../../domain/use-cases/identity/users/update-user.service';
import { GetUserService } from '../../../../domain/use-cases/identity/users/get-user.service';
import { DeleteUserService } from '../../../../domain/use-cases/identity/users/delete-user.service';
import { timer } from 'rxjs';
import { GetUsersService } from '../../../../domain/use-cases/identity/users/get-users.service';

export interface UserStateModel {
  users: UserEntity[];
  userById: UserEntity | null;
  status: StatusAction;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    userById: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class UserState {
  private readonly createUserUseCase = inject(CreateUserService);

  private readonly updateUserUseCase = inject(UpdateUserService);

  private readonly getUserUseCase = inject(GetUserService);

  private readonly getUsersUseCase = inject(GetUsersService);

  private readonly deleteUserUseCase = inject(DeleteUserService);

  @Action(UserActions.Create)
  async create(ctx: StateContext<UserStateModel>, action: UserActions.Create) {
    try {
      ctx.patchState({ status: StatusAction.LOADING });

      const user = await this.createUserUseCase.execute(action.dto);




      ctx.patchState({
        status: StatusAction.SUCCESS,
        users: [...ctx.getState().users, user],
      });

    } catch (err) {
      ctx.patchState({ status: StatusAction.ERROR });
    }

    this.setInitialState(ctx);
  }

  @Action(UserActions.Get)
  async get(ctx: StateContext<UserStateModel>, action: UserActions.Get) {
    try {
      ctx.patchState({ status: StatusAction.LOADING });
      const user = await this.getUserUseCase.execute(action.username);
      ctx.patchState({
        status: StatusAction.SUCCESS,
        userById: user ? user : null,
      });
    } catch (err) {
      ctx.patchState({ status: StatusAction.ERROR });
    }

    this.setInitialState(ctx);
  }

  @Action(UserActions.GetAll)
  async getAll(ctx: StateContext<UserStateModel>, action: UserActions.GetAll) {
    try {
      ctx.patchState({ status: StatusAction.LOADING });
      const users = await this.getUsersUseCase.execute();
      ctx.patchState({ users, status: StatusAction.INITIAL });



    } catch (err) {
      ctx.patchState({ status: StatusAction.ERROR });
    }

    this.setInitialState(ctx);
  }


  @Action(UserActions.Update)
  async update(ctx: StateContext<UserStateModel>, action: UserActions.Update) {
    try {
      ctx.patchState({ status: StatusAction.LOADING });

      const user = await this.updateUserUseCase.execute(action.dto);

      const users = ctx.getState().users.map((u) => {
        if (u.username === user.username) {
          return user;
        }
        return u;
      });

      ctx.patchState({
        status: StatusAction.SUCCESS,
        users,
      });
    } catch (err) {
      ctx.patchState({ status: StatusAction.ERROR });
    }

    this.setInitialState(ctx);
  }


  @Action(UserActions.Delete)
  async delete(
    ctx : StateContext<UserStateModel>,
    action : UserActions.Delete
  ){
    try {
      ctx.patchState({status : StatusAction.LOADING});
      await this.deleteUserUseCase.execute(action.username);
      const users = ctx.getState().users.filter((user) => user.username !== action.username);
      ctx.patchState({
        status : StatusAction.SUCCESS,
        users
      });
    } catch (err) {
      ctx.patchState({ status: StatusAction.ERROR });
    }

    this.setInitialState(ctx);

  }



  setInitialState(ctx: StateContext<UserStateModel>) {
    timer(2000).subscribe(() => {
      ctx.patchState({ status: StatusAction.INITIAL });
    });
  }
}
