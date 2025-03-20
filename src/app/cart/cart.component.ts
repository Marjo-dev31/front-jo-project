import { Component, computed, inject } from '@angular/core';
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

    cart = computed(() => this.cartService.cart());

    decrement(offerId: string, eventId: string) {
        this.cartService.cart.update((list) => {
            const item = list.find(
                (el) => el.offerId === offerId && el.eventId === eventId,
            );
            if (item) {
                item.quantity -= 1;
                item.total = item.price * item.quantity;
            }
            return [...list];
        });
    }

    increment(offerId: string, eventId: string) {
        this.cartService.cart.update((list) => {
            const item = list.find(
                (el) => el.offerId === offerId && el.eventId === eventId,
            );
            if (item) {
                item.quantity += 1;
                item.total = item.price * item.quantity;
            }
            return [...list];
        });
    }
}
