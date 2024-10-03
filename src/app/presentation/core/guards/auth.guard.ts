import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthFacadeService } from '../../../application/facade/auth/AuthFacade.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacadeService = inject(AuthFacadeService);
  const router = inject(Router);

  const credential = authFacadeService.credential();

  if (!credential) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
