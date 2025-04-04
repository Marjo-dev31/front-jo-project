import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from '../shared/services/signup.service';
import { UserCreateInterface } from '../shared/models/user.interface';

@Component({
    selector: 'app-signup',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent {
    private readonly signupService = inject(SignupService);
    private readonly router = inject(Router);

    signupForm: FormGroup = new FormGroup({
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$',
            ),
        ]),
        confirmPassword: new FormControl('', [
            Validators.required,
            Validators.pattern(
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$',
            ),
        ]),
    });

    onSubmit() {
        const newUser: UserCreateInterface = {
            firstname: this.firstname.value,
            lastname: this.lastname.value,
            username: this.username,
            email: this.email.value,
            password: this.password.value,
        };
        this.signupService.signup(newUser).subscribe((response) => {
            if (response.user.isAdmin) {
                this.router.navigate(['/backoffice']);
            } else {
                this.router.navigate(['/espacepersonnel']);
            }
        });
        this.signupForm.reset();
    }

    get lastname() {
        return this.signupForm.get('lastname') as FormControl;
    }
    get firstname() {
        return this.signupForm.get('firstname') as FormControl;
    }
    get username() {
        if (this.firstname.valid && this.lastname.valid) {
            return `${this.firstname.value}${this.lastname.value}`;
        } else {
            return '';
        }
    }
    get email() {
        return this.signupForm.get('email') as FormControl;
    }
    get password() {
        return this.signupForm.get('password') as FormControl;
    }
    get confirmPassword() {
        return this.signupForm.get('confirmPassword') as FormControl;
    }
}
