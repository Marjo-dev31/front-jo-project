import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { loginUserInterface, UserInterface } from '../models/user.interface';

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

    login(loginUser: loginUserInterface): Observable<UserInterface> {
        return this.http.post<UserInterface>(this.url, loginUser).pipe(
            catchError(() => {
                return throwError(() => new Error());
            }),
            tap((response) => {
                if (response.id) {
                    this.isLogin.update((value) => value === true);
                    this.isAdmin.update((value) => value === response.isAdmin);
                    this.connectedUser.set(response);
                }
            }),
        );
    }
}
