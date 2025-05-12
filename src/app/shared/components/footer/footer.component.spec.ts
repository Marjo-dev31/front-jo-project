import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { ActivatedRoute } from '@angular/router';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: (key: string) => (key === 'id' ? '42' : null),
                },
            },
        };

        await TestBed.configureTestingModule({
            imports: [FooterComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
