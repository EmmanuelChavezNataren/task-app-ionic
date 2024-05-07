import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseServ = inject(FirebaseService);
  const utilsServ = inject(UtilsService);

  return firebaseServ.getAuthState().pipe(
    map((auth) => {
      if (auth) {
        return true;
      }

      utilsServ.routerLink('/auth');
      return false;
    })
  );
};
