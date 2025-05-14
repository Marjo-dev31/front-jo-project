import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
    const mockAuthService = {
        isLogin: jest.fn().mockReturnValue(false),
        isAdmin: jest.fn().mockReturnValue(false),
    };
    let mockActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'front-jo' title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('front-jo');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('nav')?.textContent).toContain('Offres');
    });
});
