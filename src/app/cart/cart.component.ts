import { Component, inject, signal } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
    selector: 'app-cart',
    imports: [],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent {
    private readonly cartService = inject(CartService);

    cart = signal(this.cartService.cart);
}
