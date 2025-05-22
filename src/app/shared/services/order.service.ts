import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    orderCreateInterface,
    orderInterface,
} from '../models/order.interface';
import { cartItemInterface } from '../models/cart-item.interface';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.serverUrl}/orders`;
    private readonly authService = inject(AuthService);

    currentUserId = computed(() => this.authService.connectedUser().id);

    getAllOrders(): Observable<orderCreateInterface> {
        return this.http.get<orderCreateInterface>(this.url);
    }

    createOrder(cart: cartItemInterface[]): Observable<orderInterface> {
        return this.http.post<orderInterface>(
            `${this.url}/${this.currentUserId()}`,
            cart,
        );
    }
}
