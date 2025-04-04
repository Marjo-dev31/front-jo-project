import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
    LoginResponse,
    loginUserInterface,
    UserInterface,
} from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private readonly http = inject(HttpClient);
    private readonly url = 'http://localhost:3000/auth';

    isLogin = signal(false);
    isAdmin = signal(false);

    connectedUser = signal<UserInterface>({
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        isAdmin: false,
        privateKey: '',
        email: '',
    });

    login(loginUser: loginUserInterface): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.url, loginUser).pipe(
            catchError(() => {
                return throwError(() => new Error());
            }),
            tap((response) => {
                console.log(response);
                if (response.user) {
                    this.isLogin.set(true);
                    this.isAdmin.update(
                        (value) => value === response.user.isAdmin,
                    );
                    this.connectedUser.set(response.user);
                }
            }),
        );
    }
}
