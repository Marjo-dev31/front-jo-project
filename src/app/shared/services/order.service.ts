import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderCreateInterface, orderInterface } from '../models/order.interface';
import { cartItemInterface } from '../models/cart-item.interface';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly http = inject(HttpClient);
    private url = 'http://localhost:3000/orders';
    private readonly authService = inject(AuthService)

    currentUserId = computed(()=> this.authService.connectedUser().id)

    getAllOrders(): Observable<orderCreateInterface> {
      return this.http.get<orderCreateInterface>(this.url)
    }

    createOrder(cart: cartItemInterface[]): Observable<orderInterface> {
      return this.http.post<orderInterface>(`${this.url}/650f653d-072c-4124-9139-645d394b9c12`, cart)
    }
}
