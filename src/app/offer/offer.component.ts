import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { OfferService } from '../shared/services/offer.service';
import { sportingEventService } from '../shared/services/sporting-event.service';
import { SportingEventInterface } from '../shared/models/sportingevent.interface';
import { OfferInterface } from '../shared/models/offer.interface';

@Component({
    selector: 'app-offer',
    imports: [CurrencyPipe, TitleCasePipe, NgClass, ReactiveFormsModule],
    templateUrl: './offer.component.html',
    styleUrl: './offer.component.css',
})
export class OfferComponent {
    private readonly offerService = inject(OfferService);
    private readonly sportingEventService = inject(sportingEventService);

    public offers = signal<OfferInterface[]>(this.offerService.offers);
    public sportingEvents = signal<SportingEventInterface[]>(
        this.sportingEventService.events,
    );

    readonly form = new FormGroup({
        offer: new FormControl('', [Validators.required]),
        event: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
    });

    get offer() {
        return this.form.get('offer') as FormControl;
    }

    get event() {
        return this.form.get('event') as FormControl;
    }

    get quantity() {
        return this.form.get('quantity') as FormControl;
    }

    onSubmit() {
        const reservation = {
            offer: this.offer.value,
            event: this.event.value,
            quantity: this.quantity.value,
        };
        console.log(reservation);
    }
}
