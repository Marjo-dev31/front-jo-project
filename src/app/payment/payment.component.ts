import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { OrderService } from '../shared/services/order.service';
import { CartService } from '../shared/services/cart.service';

@Component({
    selector: 'app-payment',
    imports: [ReactiveFormsModule, CurrencyPipe],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
})
export class PaymentComponent {
    private readonly orderService = inject(OrderService);
    private readonly cartService = inject(CartService)
    dialogRef = inject<DialogRef<string>>(DialogRef<string>);
    data = inject(DIALOG_DATA);
    cart = computed(()=> this.cartService.cart())

    paymentForm = new FormGroup({
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        cardNumber: new FormControl('', [
            Validators.required,
            Validators.minLength(16),
            Validators.maxLength(16),
            Validators.pattern(/^[0-9]\d*$/),
        ]),
        expiryDate: new FormControl('', [Validators.required]),
        code: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.pattern(/^[0-9]\d*$/),
        ]),
    });

    get lastname() {
        return this.paymentForm.get('lastname') as FormControl;
    }
    get firstname() {
        return this.paymentForm.get('firstname') as FormControl;
    }
    get cardNumber() {
        return this.paymentForm.get('cardNumber') as FormControl;
    }
    get expiryDate() {
        return this.paymentForm.get('expiryDate') as FormControl;
    }
    get code() {
        return this.paymentForm.get('code') as FormControl;
    }

    onSubmit() {
        if (this.paymentForm.valid) {
            // send card in service to create an order in api
            this.orderService.createOrder(this.cart()).subscribe();
            console.log(this.paymentForm.value);
            this.paymentForm.reset();
            this.close();
            alert(
                'Merci pour votre paiement, retrouvez vos billets dans votre espace personnel.',
            );
        }
    }

    close() {
        this.dialogRef.close();
    }
}
