import { CanActivateChildFn, Router } from '@angular/router';
import { CommonService } from './services/common.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(CommonService);
  const routerRef = inject(Router);

  if(authService.getAuthenticateUser()){
    return true
  }
  routerRef.navigate(['/main'])
  return false;
};
