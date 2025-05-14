import { TestBed } from '@angular/core/testing';

import { SportingEventService } from './sporting-event.service';
import { provideHttpClient } from '@angular/common/http';

describe('sportingeventService', () => {
    let service: SportingEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideHttpClient()] });
        service = TestBed.inject(SportingEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
