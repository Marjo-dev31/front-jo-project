import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginService = inject(LoginService);
    router = inject(Router);

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    onSubmit() {
        const loginUser = {
            email: this.email.value,
            password: this.password.value,
        };
        this.loginService.login(loginUser).subscribe();
        this.loginForm.reset();
        this.router.navigate(['espacepersonnel']);
    }

    get email() {
        return this.loginForm.get('email') as FormControl;
    }
    get password() {
        return this.loginForm.get('password') as FormControl;
    }
}
