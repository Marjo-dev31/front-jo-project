import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    const mockCartService = {
        cart: jest.fn().mockReturnValue([]),
        deleteToCart: jest.fn(),
        resetCart: jest.fn(),
    };

    const mockAuthService = {
        connectedUser: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CartComponent],
            providers: [],
        })
            .overrideComponent(CartComponent, {
                set: {
                    providers: [
                        { provide: CartService, useValue: mockCartService },
                        { provide: AuthService, useValue: mockAuthService },
                    ],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
