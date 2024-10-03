import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CredentialActions } from './credential.actions';
import { CredentialEntity } from '../../../../domain/entities/auth/credential.entity';
import { LoginService } from '../../../../domain/use-cases/auth/login.service';
import { LogoutService } from '../../../../domain/use-cases/auth/logout.service';
import { StatusAction } from '../../../enums/Status.enum';

export interface CredentialStateModel {
  credential: CredentialEntity | null;
  status: StatusAction;
}

@State<CredentialStateModel>({
  name: 'credential',
  defaults: {
    credential: null,
    status: StatusAction.INITIAL,
  },
})
@Injectable()
export class CredentialState {
  private readonly loginUseCase = inject(LoginService);
  private readonly logoutUseCase = inject(LogoutService);

  @Action(CredentialActions.Login)
  async login(
    ctx: StateContext<CredentialStateModel>,
    action: CredentialActions.Login
  ) {
    try {
      ctx.patchState({ status: StatusAction.LOADING });


      const credential = await this.loginUseCase.execute(action.dto);
      localStorage.setItem('token', credential.token);

      action.callback?.onResult(credential);

      ctx.patchState({
        credential,
        status: StatusAction.SUCCESS,
      });
    } catch (err) {

      action.callback?.onError(err);

      ctx.patchState({ status: StatusAction.ERROR });
    }



  }

  @Action(CredentialActions.Logout)
  async logout(
    ctx: StateContext<CredentialStateModel>,
    action: CredentialActions.Logout
  ) {
    try {
      ctx.patchState({ status: StatusAction.LOADING });

      await this.logoutUseCase.execute();

      ctx.patchState({
        credential: null,
        status: StatusAction.SUCCESS,
      });
    } catch (err) {
      ctx.patchState({ status: StatusAction.ERROR });
    }
  }

  @Action(CredentialActions.GetCredentials)
  async getCredentials(
    ctx: StateContext<CredentialStateModel>,
  ) {

    const token = localStorage.getItem('token') || null;

    if (token) {
      const [ err , entity] = CredentialEntity.fromObject({ token})

      if( err ){
        ctx.patchState({
          status: StatusAction.ERROR,
        });
        return;
      }

      ctx.patchState({
        credential: entity as CredentialEntity,
        status: StatusAction.SUCCESS,
      });
    }
  }

  @Action(CredentialActions.ClearCredentials)
  async clearCredentials(
    ctx : StateContext<CredentialStateModel>
  ){
    localStorage.removeItem('token');

    ctx.patchState({
      credential: null,
      status: StatusAction.INITIAL,
    });
  }


}
