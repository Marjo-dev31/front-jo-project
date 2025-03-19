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
import { CartService } from '../shared/services/cart.service';
import { cartItemInterface } from '../shared/models/cart-item.interface';

@Component({
    selector: 'app-offer',
    imports: [CurrencyPipe, TitleCasePipe, NgClass, ReactiveFormsModule],
    templateUrl: './offer.component.html',
    styleUrl: './offer.component.css',
})
export class OfferComponent {
    private readonly offerService = inject(OfferService);
    private readonly sportingEventService = inject(sportingEventService);
    private readonly cartService = inject(CartService);

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

    getPrice() {
        const offerSelected = this.offers().find(
            (el) => el.id === this.offer.value,
        );
        if (offerSelected) {
            return offerSelected.price;
        }
        return 0;
    }

    getTotalByItem() {
        const offerSelected = this.offers().find(
            (el) => el.id === this.offer.value,
        );
        if (offerSelected) {
            return offerSelected.price * this.quantity.value;
        }
        return 0;
    }

    onSubmit() {
        const reservation: cartItemInterface = {
            offerId: this.offer.value,
            eventId: this.event.value,
            quantity: this.quantity.value,
            price: this.getPrice(),
            total: this.getTotalByItem(),
        };

        this.cartService.addToCart(reservation);
    }
}
