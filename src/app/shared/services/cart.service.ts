import { Injectable } from '@angular/core';
import { cartItemInterface } from '../models/cart-item.interface';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cart: cartItemInterface[] = [];

    addToCart(form: cartItemInterface) {
        this.cart.push(form);
        console.log(this.cart);
    }
}
