import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgStyle, NgClass],
    templateUrl: './header.component.html',
    styles: '',
})
export class HeaderComponent {
    private readonly cartService = inject(CartService);

    isAdmin = false;
    isConnected = false;
    isShow = signal(false);

    cartLength = computed(() =>
        this.cartService.cart().reduce((acc, cur) => acc + cur.quantity, 0),
    );

    showSideMenu() {
        this.isShow.update((value) => !value);
        //a faire fermer le sidemenu quand clic sur un lien
    }
}
