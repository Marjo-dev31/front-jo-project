import { TestBed } from '@angular/core/testing';

import { OfferService } from './offer.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('OfferService', () => {
    let service: OfferService;
    let mockHttpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HttpClient,
                    useValue: {
                        get: jest.fn(),
                        post: jest.fn(),
                    },
                },
            ],
        });
        service = TestBed.inject(OfferService);
        mockHttpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return all offers', () => {
        const offers = [
            { id: '1', title: 'offer1' },
            { id: '2', title: 'offer2' },
        ];
        mockHttpClient.get = jest.fn().mockReturnValue(of(offers));

        service.getAllOffers().subscribe((data) => {
            expect(data).toEqual(offers);
        });
    });
});
