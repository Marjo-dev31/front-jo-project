import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginForm = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    onSubmit() {
        console.log(this.loginForm.value);
    }

    get userName() {
        return this.loginForm.get('userName') as FormControl;
    }
    get password() {
        return this.loginForm.get('password') as FormControl;
    }
}
