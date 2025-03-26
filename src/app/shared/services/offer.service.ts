import { inject, Injectable } from '@angular/core';
import {
    OfferCreateInterface,
    OfferInterface,
} from '../models/offer.interface';
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

    addOffer(newOffer: OfferCreateInterface): Observable<OfferInterface> {
        return this.http.post<OfferInterface>(this.url, newOffer);
    }

    updateOffer(offer: OfferInterface): Observable<OfferInterface> {
        return this.http.patch<OfferInterface>(
            `${this.url}/${offer.id}`,
            offer,
        );
    }

    addImage(form: FormData) {
        return this.http.post(`${this.url}/upload`, form);
    }

    deleteOffer(id: string): Observable<OfferInterface> {
        return this.http.delete<OfferInterface>(`${this.url}/${id}`);
    }
}
