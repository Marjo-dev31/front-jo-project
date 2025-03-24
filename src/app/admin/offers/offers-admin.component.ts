import { Component, inject, signal } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { NgStyle, TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-offer-admin',
    imports: [TitleCasePipe, NgStyle],
    templateUrl: './offers-admin.component.html',
    styleUrl: './offers-admin.component.css',
})
export class OfferAdminComponent {
    private readonly offerService = inject(OfferService);

    public offers = toSignal(this.offerService.getAllOffers());
    addFormIsShow = signal(false);

    showAddForm() {
        this.addFormIsShow.update((value) => !value);
    }
}
