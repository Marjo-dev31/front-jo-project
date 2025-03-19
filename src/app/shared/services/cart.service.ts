import { Injectable, signal } from '@angular/core';
import { cartItemInterface } from '../models/cart-item.interface';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cart = signal<cartItemInterface[]>([]);

    addToCart(form: cartItemInterface) {
        this.cart.update((prevItems) => [...prevItems, form]);
    }
}
