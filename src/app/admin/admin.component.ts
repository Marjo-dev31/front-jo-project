import { Component } from '@angular/core';
import { EventAdminComponent } from './events/event-admin.component';
import { OfferAdminComponent } from './offers/offers-admin.component';
import { GraphComponent } from './graph/graph.component';

@Component({
    selector: 'app-admin',
    imports: [EventAdminComponent, OfferAdminComponent, GraphComponent],
    template: `<h1 class="text-4xl font-coustard my-10 text-center">
            Bienvenue sur votre espace administrateur
        </h1>
        <app-offer-admin></app-offer-admin>
        <app-event-admin></app-event-admin>
        <app-graph></app-graph> `,
    styles: '',
})
export class AdminComponent {}
