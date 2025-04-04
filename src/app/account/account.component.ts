import { Component, computed, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserCreateInterface } from '../shared/models/user.interface';
import { UserService } from '../shared/services/user.service';
import { tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-account',
    imports: [ReactiveFormsModule],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountComponent {
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);

    connectedUser = computed(() => this.authService.connectedUser());
    currentUser = computed(() => {
        if (this.connectedUser().id.length > 0) {
            return this.connectedUser();
        } else {
            return this.userService.user();
        }
    });

    updateForm = new FormGroup({
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$',
            ),
        ]),
    });

    editForm() {
        this.updateForm.patchValue({
            lastname: this.currentUser().lastname,
            firstname: this.currentUser().firstname,
            email: this.currentUser().email,
        });
    }

    onSubmit(id: string) {
        const updatedUser: UserCreateInterface = {
            firstname: this.firstname.value,
            lastname: this.lastname.value,
            username: this.username,
            email: this.email.value,
            password: this.password.value,
        };
        this.userService
            .updateUser(id, updatedUser)
            .pipe(tap(() => this.getUserById()))
            .subscribe();
        this.updateForm.reset();
    }

    getUserById() {
        this.userService.getUserById(this.currentUser().id).subscribe();
        this.currentUser = computed(() => this.userService.user());
    }

    get firstname() {
        return this.updateForm.get('firstname') as FormControl;
    }

    get lastname() {
        return this.updateForm.get('lastname') as FormControl;
    }

    get username() {
        if (this.firstname.valid && this.lastname.valid) {
            return `${this.firstname.value}${this.lastname.value}`;
        } else {
            return '';
        }
    }
    get email() {
        return this.updateForm.get('email') as FormControl;
    }
    get password() {
        return this.updateForm.get('password') as FormControl;
    }

    tickets = [
        {
            date: '12/03/2025',
            offer: 'duo',
            event: 'escalade',
        },
        {
            date: '12/03/2025',
            offer: 'famille',
            event: 'rugby',
        },
        {
            date: '01/04/2025',
            offer: 'solo',
            event: 'natation',
        },
    ];
}
