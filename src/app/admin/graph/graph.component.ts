import { Component, inject, signal } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { OfferInterface } from '../../shared/models/offer.interface';

@Component({
    selector: 'app-graph',
    imports: [],
    templateUrl: './graph.component.html',
    styleUrl: './graph.component.css',
})
export class GraphComponent {
    private readonly OfferService = inject(OfferService);

    offers = signal<OfferInterface[]>(this.OfferService.offers);
}
