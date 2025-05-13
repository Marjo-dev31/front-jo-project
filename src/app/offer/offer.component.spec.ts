import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferComponent } from './offer.component';
import { CartService } from '../shared/services/cart.service';
import { OfferService } from '../shared/services/offer.service';
import { SportingEventService } from '../shared/services/sporting-event.service';
import { of } from 'rxjs';
import { environment } from '../environments/environments';

describe('OfferComponent', () => {
    let component: OfferComponent;
    let fixture: ComponentFixture<OfferComponent>;

    const mockOfferService = {
        getAllOffers: jest.fn().mockReturnValue(
            of([
                {
                    id: 'A',
                    title: 'testtitle',
                    description: 'testdescription',
                    price: 10,
                    numberOfSales: 2,
                    imgUrl: 'testUrl',
                },
            ]),
        ),
    };

    const mockSportingEventService = {
        getAllSportingEvents: jest.fn().mockReturnValue(
            of([
                {
                    title: 'sportTest',
                    description: 'descriptionTest',
                    imgUrl: 'imgUrlTest',
                },
            ]),
        ),
    };

    const mockCartService = {
        addToCart: jest.fn(),
    };

    beforeEach(async () => {
        environment.serverUrl = 'http://fake-url.test';

        await TestBed.configureTestingModule({
            imports: [OfferComponent],
        })
            .overrideComponent(OfferComponent, {
                set: {
                    providers: [
                        { provide: CartService, useValue: mockCartService },
                        { provide: OfferService, useValue: mockOfferService },
                        {
                            provide: SportingEventService,
                            useValue: mockSportingEventService,
                        },
                    ],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(OfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
