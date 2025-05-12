import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styles: '',
})
export class LoginComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$',
            ),
        ]),
    });

    onSubmit() {
        const loginUser = {
            email: this.email.value,
            password: this.password.value,
        };
        this.authService.login(loginUser).subscribe((response) => {
            if (response.user) {
                if (!response.user.isAdmin) {
                    this.router.navigate(['espacepersonnel']);
                } else if (response.user.isAdmin) {
                    this.router.navigate(['backoffice']);
                }
            }
        });
        const alertElement = document.getElementById('wrong-credential');
        alertElement?.classList.remove('hidden');
        this.loginForm.reset();
    }

    get email() {
        return this.loginForm.get('email') as FormControl;
    }
    get password() {
        return this.loginForm.get('password') as FormControl;
    }
}
