import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const routesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  const authService = inject(AuthService);
  const userole=authService.getRole();
  if(userole=="admin"){
    return true;
  }
  else {
    router.navigate(['forbidden']);
    return false;
  }
};
