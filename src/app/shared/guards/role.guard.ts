import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const isAuthorized = (route: ActivatedRouteSnapshot) => {
        const isAdmin = authService.connectedUser().isAdmin;
        const expectedRole = route.data['isAdmin'];
        if (expectedRole.indexOf(isAdmin) !== -1) {
            return true;
        }
        router.navigate(['erreur']);
        return false;
    };
    return isAuthorized(route);
};
