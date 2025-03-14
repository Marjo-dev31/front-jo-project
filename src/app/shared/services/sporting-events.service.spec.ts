import { TestBed } from '@angular/core/testing';

import { SportingEventsService } from './sporting-events.service';

describe('SportingEventsService', () => {
    let service: SportingEventsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SportingEventsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
