import { inject, Injectable } from '@angular/core';
import {
    SportingEventCreateInterface,
    SportingEventInterface,
} from '../models/sportingevent.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class SportingEventService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.serverUrl}/sporting-event`;

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
