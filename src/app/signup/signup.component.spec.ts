import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../shared/services/auth.service';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../app.routes';
import { of } from 'rxjs';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    const mockAuthService = {
        signup: jest
            .fn()
            .mockReturnValue(
                of({ access_token: 'testtoken', user: { id: '1' } }),
            ),
    };

    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignupComponent],

            providers: [
                { provide: AuthService, useValue: mockAuthService },
                provideRouter(routes),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call signup and navigate based on user role', () => {
        const navigateSpy = jest.spyOn(router, 'navigate');

        component.onSubmit();

        expect(mockAuthService.signup).toHaveBeenCalled();

        expect(navigateSpy).toHaveBeenCalledWith(['espacepersonnel']);
    });
});
