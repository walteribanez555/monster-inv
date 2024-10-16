import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthFacadeService } from '../../../application/facade/auth/AuthFacade.service';
import { cleanStructure } from '../../utils/json.utils';
import { getRoutesFromMenuItem, verifyRoute } from '../../utils/routes.utils';
import { DialogService } from '../../modules/shared/services/Dialog.service';
import { timer } from 'rxjs';
import { DialogType, DialogPosition } from '../../modules/shared/enum/dialog';
import { Dialog } from '../../modules/shared/models/dialog';
import { Menu } from '../constants/menu';
import { SubMenuItem } from '../models/menu.model';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacadeService = inject(AuthFacadeService);
  const dialogService = inject(DialogService);
  const router = inject(Router);

  const credential = authFacadeService.credential();

  const pages = authFacadeService.pages();

  if (!credential) {
    router.navigate(['../auth/login']);
    return false;
  }

  const items = credential.rols.split('~').map((rol) => JSON.parse(rol));
  const rules = items.map((item) =>
    JSON.parse(cleanStructure(item.rol_structure))
  );

  const appRules = rules.map((r) => r.apps);

  const routes: string[] = [];

  const validRoutes: string[][] = [];

  appRules.forEach((rule) => {
    rule.forEach((ruleItem: any) => {
      ruleItem.pages.forEach((page: string) => {
        validRoutes.push(page.split('/'));
      });
    });
  });

  pages.forEach((page) => {
    page.items.forEach((item) => {
      const itemAux = getRoutesFromMenuItem(item, validRoutes);
      itemAux ? routes.push(itemAux.route!) : null;
    });
  });

  const extraRoutes = [
    "process/preparations/view/:",
    "process/recipes/view/:",
  ]

  const stateRouting = verifyRoute(state.url, validRoutes);


  if (!stateRouting) {
    const dialogSuccess: Dialog = {
      typeDialog: DialogType.isSuccess,
      data: {
        title: 'Acceso denegado',
        description: `No tiene permisos para acceder a la pagina ${state.url}, comuniquese con el administrador`,
        icon: 'assets/icons/heroicons/outline/cog.svg',
      },
      options: {
        withBackground: true,
        position: [DialogPosition.center],
        colorIcon: 'text-red-500',
        timeToShow: timer(2000),
      },


    };
    dialogService.open(dialogSuccess);
    console.log({routes});
    router.navigate([routes[0]]);
  }



  return stateRouting;
};
