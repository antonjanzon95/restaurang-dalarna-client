import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(UserService);

  return auth.isLoggedIn().pipe(map((user) => !!user));
};
