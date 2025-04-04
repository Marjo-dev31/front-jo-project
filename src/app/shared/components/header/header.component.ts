import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgStyle, NgClass],
    templateUrl: './header.component.html',
    styles: '',
})
export class HeaderComponent {
    private readonly cartService = inject(CartService);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    isAdmin = computed(() => this.authService.isAdmin());
    isLogin = computed(() => this.authService.isLogin());
    isShow = signal(false);

    cartLength = computed(() =>
        this.cartService.cart().reduce((acc, cur) => acc + cur.quantity, 0),
    );

    showSideMenu() {
        this.isShow.update((value) => !value);
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
