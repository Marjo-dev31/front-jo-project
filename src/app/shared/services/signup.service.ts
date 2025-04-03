import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserCreateInterface, UserInterface } from '../models/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignupService {
    private readonly http = inject(HttpClient);
    private readonly url = 'http://localhost:3000/user';

    createdUser = signal<UserInterface>({
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        isAdmin: false,
        privateKey: '',
        email: '',
    });

    signup(newUser: UserCreateInterface): Observable<UserInterface> {
        return this.http
            .post<UserInterface>(this.url, newUser)
            .pipe(tap((res) => this.createdUser.set(res)));
    }
}
