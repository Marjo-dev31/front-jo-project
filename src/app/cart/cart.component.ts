import { Component, computed, inject } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { cartItemInterface } from '../shared/models/cart-item.interface';
import { PaymentComponent } from '../payment/payment.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    imports: [DialogModule, TitleCasePipe],
    templateUrl: './cart.component.html',
    styles: '',
})
export class CartComponent {
    private readonly cartService = inject(CartService);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    dialog = inject(Dialog);

    totalCart = computed(() =>
        this.cartService.cart().reduce((acc, cur) => acc + cur.total, 0),
    );

    cart = computed(() => this.cartService.cart());
    currentUser = computed(() => this.authService.connectedUser());

    decrement(offerId: string, eventId: string) {
        this.cartService.cart.update((list) => {
            const item = list.find(
                (el) =>
                    el.offerId === offerId && el.sportingEventId === eventId,
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
                (el) =>
                    el.offerId === offerId && el.sportingEventId === eventId,
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
        if (this.currentUser().id.length > 0) {
            const dialogRef = this.dialog.open<string>(PaymentComponent, {
                width: '250px',
                data: this.totalCart(),
            });
            dialogRef.closed.subscribe(() => {
                this.resetCart();
                this.router.navigateByUrl('espacepersonnel');
            });
        } else {
            this.router.navigateByUrl('login');
        }
    }

    resetCart() {
        this.cartService.resetCart();
    }
}
