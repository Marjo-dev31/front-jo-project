import { TestBed } from '@angular/core/testing';

import { SportingEventService } from './sporting-event.service';

describe('sportingeventService', () => {
    let service: SportingEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SportingEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
