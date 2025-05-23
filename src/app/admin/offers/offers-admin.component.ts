import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { NgStyle, TitleCasePipe } from '@angular/common';

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
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-offer-admin',
    imports: [TitleCasePipe, NgStyle, ReactiveFormsModule],
    templateUrl: './offers-admin.component.html',
    styles: '',
})
export class OfferAdminComponent implements OnInit {
    private readonly offerService = inject(OfferService);
    private readonly destroyRef = inject(DestroyRef);

    public offers!: OfferInterface[] | undefined;

    public addFormIsShow = signal(false);
    selectedFile: File | null = null;
    formIsSubmitted = signal(false);

    ngOnInit(): void {
        this.getAllOffers();
    }

    addForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        price: new FormControl(0, [
            Validators.required,
            Validators.pattern(/^[0-9]\d*$/),
        ]),
        numberOfSales: new FormControl(0),
        imgUrl: new FormControl('', [Validators.required]),
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

    getAllOffers() {
        this.offerService
            .getAllOffers()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((offers) => (this.offers = offers));
    }

    onSubmit() {
        // create formdata to post img type file
        const formData = new FormData();
        formData.append('file', this.selectedFile as File);

        this.offerService
            .addImage(formData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

        // take the name of file and record in newOffer
        const imgUrl = this.imgUrl.value.split('\\').slice(-1);

        const newOffer: OfferCreateInterface = {
            title: this.title.value,
            description: this.description.value,
            price: +this.price.value,
            numberOfSales: 0,
            imgUrl: imgUrl[0],
        };

        // check if alreadyExist and make put or post
        const offerAlreadyExist = this.offers?.find(
            (el) => el.title.toLowerCase() === newOffer.title.toLowerCase(),
        );
        if (offerAlreadyExist) {
            const updatedOffer: OfferInterface = {
                id: offerAlreadyExist.id,
                ...newOffer,
            };
            this.offerService
                .updateOffer(updatedOffer)
                .pipe(
                    tap(() => this.getAllOffers()),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        } else {
            this.offerService
                .addOffer(newOffer)
                .pipe(
                    tap(() => this.getAllOffers()),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
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
        this.offerService
            .deleteOffer(id)
            .pipe(
                tap(() => this.getAllOffers()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
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
