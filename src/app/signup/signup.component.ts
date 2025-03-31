import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signup',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent {
    signupForm: FormGroup = new FormGroup({
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required, Validators.email]),
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
        const newUser = {
            lastname: this.lastname.value,
            firstname: this.firstname.value,
            username: this.username,
            mail: this.mail.value,
            password: this.password.value,
        };
        console.log(newUser);
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
    get mail() {
        return this.signupForm.get('mail') as FormControl;
    }
    get password() {
        return this.signupForm.get('password') as FormControl;
    }
    get confirmPassword() {
        return this.signupForm.get('confirmPassword') as FormControl;
    }
}
