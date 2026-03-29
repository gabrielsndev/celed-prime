import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole();
  const expectedRole = route.data['expectedRole'];

  if (userRole === expectedRole) {
    return true;
  }

  console.warn(`Acesso negado: esperado ${expectedRole}, mas o usuário é ${userRole}`);
  router.navigate(['/home']);
  return false;
};
