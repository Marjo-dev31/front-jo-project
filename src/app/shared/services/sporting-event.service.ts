import { inject, Injectable } from '@angular/core';
import {
    SportingEventCreateInterface,
    SportingEventInterface,
} from '../models/sportingevent.interface';
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

    addSportingEvent(
        sportingEvent: SportingEventCreateInterface,
    ): Observable<SportingEventInterface> {
        return this.http.post<SportingEventInterface>(this.url, sportingEvent);
    }

    updateSportingEvent(
        sportingEvent: SportingEventInterface,
    ): Observable<SportingEventInterface> {
        return this.http.patch<SportingEventInterface>(
            `${this.url}/${sportingEvent.id}`,
            sportingEvent,
        );
    }

    addImage(form: FormData) {
        return this.http.post(`${this.url}/upload`, form);
    }

    deleteEvent(id: string): Observable<SportingEventInterface> {
        return this.http.delete<SportingEventInterface>(`${this.url}/${id}`);
    }
}
