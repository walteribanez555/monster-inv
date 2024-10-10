import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CredentialActions } from './credential.actions';
import { CredentialEntity } from '../../../../domain/entities/auth/credential.entity';
import { LoginService } from '../../../../domain/use-cases/auth/login.service';
import { LogoutService } from '../../../../domain/use-cases/auth/logout.service';
import { StatusAction } from '../../../enums/Status.enum';
import { MenuItem } from '../../../../presentation/core/models/menu.model';
import { state } from '@angular/animations';
import { Menu } from '../../../../presentation/core/constants/menu';
import { cleanStructure } from '../../../../presentation/utils/json.utils';
import { verifyRoute, getRoutesFromMenuItem } from '../../../../presentation/utils/routes.utils';

export interface CredentialStateModel {
  credential: CredentialEntity | null;
  status: StatusAction;
  pages: MenuItem[];
}

@State<CredentialStateModel>({
  name: 'credential',
  defaults: {
    credential: null,
    status: StatusAction.INITIAL,
    pages: [],
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
      localStorage.setItem('username', credential.username);
      localStorage.setItem('name', credential.name);
      localStorage.setItem('rols', credential.rols);
      localStorage.setItem('user_id', credential.user_id);

      action.callback?.onResult(credential);

      ctx.patchState({
        credential,
        status: StatusAction.SUCCESS,
      });

      this.setRoutes(credential, ctx);
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
        pages : [],
        status: StatusAction.SUCCESS,
      });
    } catch (err) {
      ctx.patchState({ status: StatusAction.ERROR });
    }
  }

  @Action(CredentialActions.GetCredentials)
  async getCredentials(ctx: StateContext<CredentialStateModel>) {
    const token = localStorage.getItem('token') || null;
    const username = localStorage.getItem('username') || null;
    const name = localStorage.getItem('name') || null;
    const rols = localStorage.getItem('rols') || null;
    const user_id = localStorage.getItem('user_id') || null;

    if (token && username && name && rols && user_id) {
      const [err, entity] = CredentialEntity.fromLocalStorage({
        sessionToken: token,
        username,
        name,
        rols,
        user_id,
      });

      if (err) {
        ctx.patchState({
          status: StatusAction.ERROR,
        });
        return;
      }

      ctx.patchState({
        credential: entity as CredentialEntity,
        status: StatusAction.SUCCESS,
      });

      this.setRoutes(entity as CredentialEntity, ctx);
    }
  }

  @Action(CredentialActions.ClearCredentials)
  async clearCredentials(ctx: StateContext<CredentialStateModel>) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('rols');
    localStorage.removeItem('user_id');

    ctx.patchState({
      credential: null,
      pages : [],
      status: StatusAction.INITIAL,
    });
  }

  setRoutes(credential: CredentialEntity, ctx : StateContext<CredentialStateModel>) {
    const items = credential.rols.split('~').map((rol) => JSON.parse(rol));
    const rules = items.map((item) =>
      JSON.parse(cleanStructure(item.rol_structure))
    );
    const appRules = rules.map((r) => r.apps);

    const validRoutes: string[][] = [];



    appRules.forEach((rule) => {
      rule.forEach((ruleItem: any) => {
        ruleItem.pages.forEach((page: string) => {
          validRoutes.push(page.split('/'));
        });
      });
    });


    const filteredPages = Menu.pages.filter((page) => {
      const itemsFiltered = page.items.filter((item) => {
        return getRoutesFromMenuItem(item, validRoutes);
      });
      return itemsFiltered.length > 0;
    });

    console.log(filteredPages);
    console.log(validRoutes);



    ctx.patchState({
      pages : filteredPages
    });


  }
}
