import { NgClass, NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin',
    imports: [RouterOutlet, RouterLink, NgStyle, NgClass],
    template: `<h1 class="text-4xl font-coustard my-10 text-center">
            Bienvenue sur votre espace administrateur
        </h1>

        <div class="relative">
            <div
                class="w-64 h-96 bg-primary text-secondary absolute delay-150 duration-200"
                [ngClass]="{ '-translate-x-64': !sidenavIsVisible() }"
            >
                <h2 class="text-center text-2xl font-bold font-coustard my-4">
                    Bonjour Admin
                </h2>

                <ul class="text-right">
                    <li class="">
                        <a
                            [routerLink]="['/backoffice/offers']"
                            class="block text-xl p-6 hover:bg-gray-100 rounded-l-xl"
                            >Offres</a
                        >
                    </li>
                    <li>
                        <a
                            [routerLink]="['/backoffice/sportingevents']"
                            class="block text-xl p-6 hover:bg-gray-100 rounded-l-xl"
                            >Epreuves</a
                        >
                    </li>
                    <li>
                        <a
                            [routerLink]="['/backoffice/sales']"
                            class="block text-xl p-6 hover:bg-gray-100 rounded-l-xl"
                            >Ventes</a
                        >
                    </li>
                </ul>

                <div
                    class="absolute top-0 -right-10 bg-primary p-2 rounded-r-xl"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-8 "
                        (click)="showSidenav()"
                        (keyup.enter)="showSidenav()"
                        tabindex="0"
                        [ngStyle]="{
                            display: sidenavIsVisible() ? 'none' : 'flex',
                        }"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-8"
                        (click)="showSidenav()"
                        (keyup.enter)="showSidenav()"
                        tabindex="0"
                        [ngStyle]="{
                            display: sidenavIsVisible() ? 'flex' : 'none',
                        }"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <router-outlet class=""></router-outlet>`,
    styles: ``,
})
export class AdminComponent {
    public sidenavIsVisible = signal(false);

    showSidenav() {
        this.sidenavIsVisible.update((value) => !value);
    }
}
