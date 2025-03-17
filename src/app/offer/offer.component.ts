import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { OfferService } from '../shared/services/offer.service';
import { sportingEventService } from '../shared/services/sporting-event.service';

@Component({
    selector: 'app-offer',
    imports: [CurrencyPipe, TitleCasePipe, NgClass],
    templateUrl: './offer.component.html',
    styleUrl: './offer.component.css',
})
export class OfferComponent {
    private readonly offerService = inject(OfferService);
    private readonly sportingEventService = inject(sportingEventService);

    offers = signal(this.offerService.offers);
    sportingEvents = signal(this.sportingEventService.events);

    onSubmit() {
        console.log('toto');
    }
}
