import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    let mockAuthService: any;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: (key: string) => (key === 'id' ? '42' : null),
                },
            },
        };

        mockAuthService = {
            isLogin: jest.fn().mockReturnValue(false),
            isAdmin: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return true when isAdmin is true', () => {
        mockAuthService.isAdmin.mockReturnValue(true);
        expect(component.isAdmin()).toBe(true);
    });

    it('should return false when isLogin is false', () => {
        // mockAuthService.isLogin.mockReturnValue(true);
        expect(component.isLogin()).toBe(false);
    });
});
