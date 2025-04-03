import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { loginUserInterface, UserInterface } from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private readonly http = inject(HttpClient);
    private readonly url = 'http://localhost:3000/auth';

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
        return this.http
            .post<UserInterface>(this.url, loginUser)
            .pipe(tap((response) => this.connectedUser.set(response)));
    }
}
