import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';
import { OfferService } from '../../shared/services/offer.service';
import { of } from 'rxjs';

describe('GraphComponent', () => {
    let component: GraphComponent;
    let fixture: ComponentFixture<GraphComponent>;

    const mockOfferService = {
        getAllOffers: jest.fn().mockReturnValue(of([{}])),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GraphComponent],
            providers: [{ provide: OfferService, useValue: mockOfferService }],
        }).compileComponents();

        fixture = TestBed.createComponent(GraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
