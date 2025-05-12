import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { OfferService } from '../shared/services/offer.service';
import { SportingEventService } from '../shared/services/sporting-event.service';
import { CartService } from '../shared/services/cart.service';
import { cartItemInterface } from '../shared/models/cart-item.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../environments/environments';

@Component({
    selector: 'app-offer',
    imports: [CurrencyPipe, TitleCasePipe, NgClass, ReactiveFormsModule],
    templateUrl: './offer.component.html',
    styles: '',
})
export class OfferComponent {
    private readonly offerService = inject(OfferService);
    private readonly sportingEventService = inject(SportingEventService);
    private readonly cartService = inject(CartService);

    public offers = toSignal(this.offerService.getAllOffers());
    public sportingEvents = toSignal(
        this.sportingEventService.getAllSportingEvents(),
    );
    public formIsSubmitted = signal<boolean>(false);
    url = `${environment.serverUrl}/offer/upload/`;

    readonly form = new FormGroup({
        offer: new FormControl('', [Validators.required]),
        event: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(10),
        ]),
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

    getPrice() {
        const offerSelected = this.offers()?.find(
            (el) => el.id === this.offer.value,
        );
        if (offerSelected) {
            return offerSelected.price;
        }
        return 0;
    }

    getTotalByItem() {
        const offerSelected = this.offers()?.find(
            (el) => el.id === this.offer.value,
        );
        if (offerSelected) {
            return offerSelected.price * this.quantity.value;
        }
        return 0;
    }

    getOfferTitle(): string {
        const offer = this.offers()?.find((el) => el.id === this.offer.value);
        if (offer) {
            return offer?.title;
        } else {
            return '';
        }
    }

    getEventTitle(): string {
        const sportingEvent = this.sportingEvents()?.find(
            (el) => el.id === this.event.value,
        );
        if (sportingEvent) {
            return sportingEvent?.title;
        } else {
            return '';
        }
    }

    onSubmit() {
        const reservation: cartItemInterface = {
            offerId: this.offer.value,
            offer: this.getOfferTitle(),
            sportingEventId: this.event.value,
            sportingEvent: this.getEventTitle(),
            quantity: this.quantity.value,
            price: this.getPrice(),
            total: this.getTotalByItem(),
        };
        if (this.form.valid) {
            this.cartService.addToCart(reservation);
            this.formIsSubmitted.set(true);
            this.form.reset();
        }
    }
}
