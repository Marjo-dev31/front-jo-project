import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserCreateInterface, UserInterface } from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly url = 'http://localhost:3000/user';

    user = signal<UserInterface>({
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        isAdmin: false,
        privateKey: '',
        email: '',
    });

    getUser(): Observable<UserInterface> {
        return this.http.get<UserInterface>(this.url);
    }

    getUserById(id: string): Observable<UserInterface> {
        return this.http
            .get<UserInterface>(`${this.url}/${id}`)
            .pipe(tap((resp) => this.user.set(resp)));
    }

    updateUser(
        id: string,
        updatedUser: UserCreateInterface,
    ): Observable<UserInterface> {
        return this.http.patch<UserInterface>(`${this.url}/${id}`, updatedUser);
    }
}
