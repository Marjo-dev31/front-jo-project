import { Component, inject, signal } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { OfferInterface } from '../../shared/models/offer.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-offer-admin',
    imports: [TitleCasePipe],
    templateUrl: './offers-admin.component.html',
    styleUrl: './offers-admin.component.css',
})
export class OfferAdminComponent {
    private readonly offerService = inject(OfferService);

    public offers = signal<OfferInterface[]>(this.offerService.offers);
}
