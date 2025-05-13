import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { TicketService } from '../shared/services/ticket.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { DatePipe } from '@angular/common';

describe('AccountComponent', () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;

    const userMock = {
        id: '1',
        firstname: 'test',
        lastname: 'TEST',
        username: 'testTEST',
        password: 'testpassword',
        isAdmin: false,
        privateKey: 'testkey',
        email: 'test@test.com',
    };

    const mockAuthService = {
        connectedUser: jest.fn().mockReturnValue(userMock),
    };

    const mockUserService = {
        user: jest.fn().mockReturnValue(userMock),
        updateUser: jest.fn().mockReturnValue(of(userMock)),
        getUserById: jest.fn().mockReturnValue(of(userMock)),
    };

    const mockTicketService = {
        getAllByUser: jest.fn().mockReturnValue(
            of([
                {
                    id: '1',
                    offer: { id: 'A' },
                    sportingEvent: { id: 'A' },
                    order: { id: 'a', user: { privateKey: 'testKey' } },
                },
            ]),
        ),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccountComponent, ReactiveFormsModule, QRCodeComponent],
            providers: [DatePipe],
        })
            .overrideComponent(AccountComponent, {
                set: {
                    providers: [
                        { provide: AuthService, useValue: mockAuthService },
                        { provide: UserService, useValue: mockUserService },
                        { provide: TicketService, useValue: mockTicketService },
                    ],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
