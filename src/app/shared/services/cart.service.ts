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
                    el.offerId === form.offerId &&
                    el.sportingEventId === form.sportingEventId,
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

    deleteToCart(item: cartItemInterface) {
        this.cart.update((list) => list.filter((el) => el != item));
    }

    resetCart() {
        this.cart.update((value ) => value = []);
    }
}
