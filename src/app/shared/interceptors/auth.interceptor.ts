import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const acces_token = inject(AuthService).access_token();
    const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${acces_token}` },
    });
    return next(authReq);
};
