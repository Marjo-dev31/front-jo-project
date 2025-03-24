import { inject, Injectable } from '@angular/core';
import { OfferInterface } from '../models/offer.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OfferService {
    private readonly http = inject(HttpClient);
    private url = 'http://localhost:3000/offer';

    getAllOffers(): Observable<OfferInterface[]> {
        return this.http.get<OfferInterface[]>(this.url);
    }
}
