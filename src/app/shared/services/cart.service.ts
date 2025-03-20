import { Injectable, signal } from '@angular/core';
import { cartItemInterface } from '../models/cart-item.interface';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cart = signal<cartItemInterface[]>([]);

    addToCart(form: cartItemInterface) {
        this.cart.update((list) => {
            const itemAlreadyExist = list.find(
                (el) =>
                    el.offerId === form.offerId && el.eventId === form.eventId,
            );
            if (itemAlreadyExist) {
                itemAlreadyExist.quantity += form.quantity;
                itemAlreadyExist.total += form.total;
                return [...list];
            } else {
                this.cart.update((prevItems) => [...prevItems, form]);
            }
            return this.cart();
        });
    }

    deleteToCart(offerId: string, eventId: string) {
        this.cart.update((list) => {
            const itemExist = list.find(
                (el) => el.offerId === offerId && el.eventId === eventId,
            );
            const cartFiltered = list.filter(
                (el) =>
                    itemExist?.offerId != el.offerId &&
                    itemExist?.eventId != el.eventId,
            );
            return cartFiltered;
        });
    }
}
