import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAdminComponent } from './event-admin.component';
import { SportingEventService } from '../../shared/services/sporting-event.service';
import { of } from 'rxjs';

describe('EventAdminComponent', () => {
    let component: EventAdminComponent;
    let fixture: ComponentFixture<EventAdminComponent>;

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
        addImage: jest.fn(),
        updateSportingEvent: jest.fn(),
        addSportingEvent: jest.fn(),
        deleteEvent: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventAdminComponent],
            providers: [
                {
                    provide: SportingEventService,
                    useValue: mockSportingEventService,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EventAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
