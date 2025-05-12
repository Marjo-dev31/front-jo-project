import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketInterface } from '../models/ticket.interface';

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    private readonly http = inject(HttpClient);
    private readonly url = 'http://localhost:3000/tickets';

    getAllByUser(id: string): Observable<TicketInterface[]> {
        return this.http.get<TicketInterface[]>(`${this.url}/${id}`);
    }
}
