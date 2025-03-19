import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
    selector: 'app-cart',
    imports: [],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent {
    private readonly cartService = inject(CartService);

    totalCart = computed(() =>
        this.cartService.cart().reduce((acc, cur) => acc + cur.total, 0),
    );

    cart = signal(this.cartService.cart());

    decrement(id: string) {
        this.cartService.cart.update((list) => {
            const item = list.find((el) => el.offerId === id);
            if (item) {
                item.quantity -= 1;
                item.total = item.price * item.quantity;
            }
            return [...list];
        });
        console.log(this.cartService.cart(), this.totalCart());
    }

    increment(id: string) {
        this.cartService.cart.update((list) => {
            const item = list.find((el) => el.offerId === id);
            if (item) {
                item.quantity += 1;
                item.total = item.price * item.quantity;
            }
            return [...list];
        });
    }
}
