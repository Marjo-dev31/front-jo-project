import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin',
    imports: [RouterOutlet, RouterLink],
    template: `<h1 class="text-4xl font-coustard my-10 text-center">
            Bienvenue sur votre espace administrateur
        </h1>
        <div
            class="w-64 h-1/2 bg-primary rounded-tr-lg text-secondary absolute"
        >
            <h2 class="text-center text-2xl font-bold font-coustard my-4">
                Bonjour
            </h2>
            <ul class="">
                <li class="">
                    <a
                        [routerLink]="['/backoffice/offers']"
                        class="block text-xl p-4 hover:bg-gray-100 rounded-l-xl"
                        >Offres</a
                    >
                </li>
                <li>
                    <a
                        [routerLink]="['/backoffice/sportingevents']"
                        class="block text-xl p-4 hover:bg-gray-100 rounded-l-xl"
                        >Epreuves</a
                    >
                </li>
                <li>
                    <a
                        [routerLink]="['/backoffice/sales']"
                        class="block text-xl p-4 hover:bg-gray-100 rounded-l-xl"
                        >Ventes</a
                    >
                </li>
            </ul>
        </div>
        <router-outlet></router-outlet> `,
    styles: ``,
})
export class AdminComponent {}
