import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { OrderService } from '../shared/services/order.service';
import { CartService } from '../shared/services/cart.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

describe('PaymentComponent', () => {
    let component: PaymentComponent;
    let fixture: ComponentFixture<PaymentComponent>;

    const mockOrderService = {
        createOrder: jest.fn(),
    };

    const mockCartService = {
        cart: jest.fn(),
    };

    const mockDialogRef = {
        close: jest.fn(),
    };

    const mockDialogData = 10;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaymentComponent],
            providers: [
                { provide: OrderService, useValue: mockOrderService },
                { provide: CartService, useValue: mockCartService },
                { provide: DialogRef, useValue: mockDialogRef },
                { provide: DIALOG_DATA, useValue: mockDialogData },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close dialog', () => {
        component.close();
        expect(mockDialogRef.close).toHaveBeenCalled();
    });
});
