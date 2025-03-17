import { TestBed } from '@angular/core/testing';

import { sportingeventService } from './sporting-event.service';

describe('sportingeventService', () => {
    let service: sportingeventService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(sportingeventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
