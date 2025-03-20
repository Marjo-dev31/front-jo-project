import { Component, computed, inject } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { cartItemInterface } from '../shared/models/cart-item.interface';
import { PaymentComponent } from '../payment/payment.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
    selector: 'app-cart',
    imports: [DialogModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent {
    private readonly cartService = inject(CartService);
    dialog = inject(Dialog);

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

    deleteItem(item: cartItemInterface) {
        this.cartService.deleteToCart(item);
    }

    openDialog() {
        this.dialog.open<string>(PaymentComponent, {
            width: '250px',
            data: this.totalCart(),
        });
        // dialogRef.closed.subscribe((result) =>
        //     console.log('the dialog was closed', result),
        // );
    }
}
