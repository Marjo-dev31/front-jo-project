import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
    LoginResponse,
    loginUserInterface,
    UserCreateInterface,
    UserInterface,
} from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
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
        return this.http
            .post<LoginResponse>(`${this.url}/login`, loginUser)
            .pipe(
                catchError(() => {
                    return throwError(() => new Error());
                }),
                tap((response) => {
                    if (response.user) {
                        this.isLogin.set(true);
                        this.isAdmin.set(response.user.isAdmin);
                        this.connectedUser.set(response.user);
                    }
                }),
            );
    }

    signup(newUser: UserCreateInterface): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.url}/signup`, newUser)
            .pipe(
                catchError(() => {
                    return throwError(() => new Error());
                }),
                tap((res) => {
                    if (res.user) {
                        this.connectedUser.set(res.user);
                        this.isLogin.set(true);
                    }
                }),
            );
    }

    logout() {
        this.isLogin.set(false);
        this.isAdmin.set(false);
        this.connectedUser.set({
            id: '',
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            isAdmin: false,
            privateKey: '',
            email: '',
        });
    }
}
