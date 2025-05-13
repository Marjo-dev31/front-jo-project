import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, provideRouter } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../shared/services/auth.service';
import { routes } from '../app.routes';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let router: Router;

    const mockAuthService = {
        login: jest.fn().mockReturnValue(of({ user: { isAdmin: true } })),
    };

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: (key: string) => (key === 'id' ? '42' : null),
                },
            },
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, LoginComponent],
            providers: [provideRouter(routes)],
        })
            .overrideComponent(LoginComponent, {
                set: {
                    providers: [
                        { provide: AuthService, useValue: mockAuthService },
                        {
                            provide: ActivatedRoute,
                            useValue: mockActivatedRoute,
                        },
                    ],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);

        component.loginForm.setValue({
            email: 'test@example.com',
            password: 'password123',
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call login and navigate based on user role', () => {
        const navigateSpy = jest.spyOn(router, 'navigate');

        component.onSubmit();

        expect(mockAuthService.login).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(navigateSpy).toHaveBeenCalledWith(['backoffice']);
    });
});
