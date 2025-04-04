import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const access_token = inject(AuthService).access_token();
    if (access_token.length > 0) {
        return true;
    }
    router.navigate(['/login']);
    return false;
};
