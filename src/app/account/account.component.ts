import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserUpdatedInterface } from '../shared/models/user.interface';
import { UserService } from '../shared/services/user.service';
import { tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { TicketService } from '../shared/services/ticket.service';
import { TicketInterface } from '../shared/models/ticket.interface';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';

@Component({
    selector: 'app-account',
    imports: [ReactiveFormsModule, DatePipe],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);
    private readonly ticketService = inject(TicketService);

    connectedUser = computed(() => this.authService.connectedUser());
    currentUser = computed(() => {
        if (this.connectedUser().id.length > 0) {
            return this.connectedUser();
        } else {
            return this.userService.user();
        }
    });

    tickets = signal<TicketInterface[]>([]);

    ngOnInit(): void {
        this.getTicketsByUser();
    }

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

    onSubmit() {
        const updatedUser: UserUpdatedInterface = {
            id: this.currentUser().id,
            firstname: this.firstname.value,
            lastname: this.lastname.value,
            username: this.username,
            email: this.email.value,
            password: this.password.value,
        };
        this.userService
            .updateUser(updatedUser)
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

    getTicketsByUser() {
        this.ticketService
            .getAllByUser(this.currentUser().id)
            .subscribe((response: TicketInterface[]) =>
                this.tickets.update((value) => (value = response)),
            );
    }

    generatePdf(id: string) {
        const doc = new jsPDF();
        doc.setFontSize(20)
        doc.text('Votre e-billet', 10, 10)
        doc.setFontSize(16)
        doc.text(
            `Bonjour ${this.currentUser().firstname}, veuillez présenter ce billet à l'entrée de l'épreuve`,
            10,
            20,
        );
        doc.save('ticket.pdf');
    }

}
