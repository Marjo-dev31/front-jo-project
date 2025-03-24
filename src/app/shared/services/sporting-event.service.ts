import { inject, Injectable } from '@angular/core';
import { SportingEventInterface } from '../models/sportingevent.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class sportingEventService {
    private readonly http = inject(HttpClient);
    url = 'http://localhost:3000/sporting-event';

    getAllSportingEvents(): Observable<SportingEventInterface[]> {
        return this.http.get<SportingEventInterface[]>(this.url);
    }
}
