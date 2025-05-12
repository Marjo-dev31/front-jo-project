import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SportingEventService } from '../shared/services/sporting-event.service';
import { of } from 'rxjs';
import { environment } from '../environments/environments';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    const mockService = {
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

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: (key: string) => (key === 'id' ? '42' : null),
                },
            },
        };
        environment.serverUrl = 'http://fake-url.test';
        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                { provide: SportingEventService, useValue: mockService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get sportingevents from service', () => {
        expect(component.events()).toEqual([
            {
                title: 'sportTest',
                description: 'descriptionTest',
                imgUrl: 'imgUrlTest',
            },
        ]);
        expect(mockService.getAllSportingEvents).toHaveBeenCalled();
    });
});
