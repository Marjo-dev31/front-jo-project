import { Component, inject, signal } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { NgStyle, TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    OfferCreateInterface,
    OfferInterface,
} from '../../shared/models/offer.interface';

@Component({
    selector: 'app-offer-admin',
    imports: [TitleCasePipe, NgStyle, ReactiveFormsModule],
    templateUrl: './offers-admin.component.html',
    styleUrl: './offers-admin.component.css',
})
export class OfferAdminComponent {
    private readonly offerService = inject(OfferService);

    public offers = toSignal(this.offerService.getAllOffers());
    public addFormIsShow = signal(false);
    selectedFile: File | null = null;
    formIsSubmitted = signal(false);

    addForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        price: new FormControl(0, [
            Validators.required,
            Validators.pattern(/^[0-9]\d*$/),
        ]),
        numberOfSales: new FormControl(0),
        imgUrl: new FormControl(null, [Validators.required]),
    });

    showAddForm() {
        this.addFormIsShow.update((value) => !value);
        this.addForm.reset();
    }

    showEditForm(offer: OfferInterface) {
        this.addFormIsShow.set(true);
        this.addForm.patchValue({
            title: offer.title,
            description: offer.description,
            price: offer.price,
            numberOfSales: offer.numberOfSales,
        });
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('file', this.selectedFile as Blob);
        this.offerService.addImage(formData).subscribe();

        const imgUrl = this.imgUrl.value.split(`\\`).slice(-1);

        const newOffer: OfferCreateInterface = {
            title: this.title.value,
            description: this.description.value,
            price: this.price.value,
            numberOfSales: 0,
            imgUrl: imgUrl[0],
        };
        const offerAlreadyExist = this.offers()?.find(
            (el) => el.title === newOffer.title,
        );
        if (offerAlreadyExist) {
            const updatedOffer: OfferInterface = {
                id: offerAlreadyExist.id,
                ...newOffer,
            };
            this.offerService.updateOffer(updatedOffer).subscribe();
        } else {
            this.offerService.addOffer(newOffer).subscribe();
        }
        this.formIsSubmitted.set(true);
        this.addForm.reset();
    }

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files?.length) {
            this.selectedFile = target.files[0];
        }
    }

    deleteOffer(id: string) {
        this.offerService.deleteOffer(id).subscribe();
    }

    get title() {
        return this.addForm.get('title') as FormControl;
    }
    get description() {
        return this.addForm.get('description') as FormControl;
    }
    get price() {
        return this.addForm.get('price') as FormControl;
    }

    get imgUrl() {
        return this.addForm.get('imgUrl') as FormControl;
    }
}
