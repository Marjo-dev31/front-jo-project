import {
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
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
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-account',
    imports: [ReactiveFormsModule, DatePipe, QRCodeComponent],
    templateUrl: './account.component.html',
    styles: '',
})
export class AccountComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);
    private readonly ticketService = inject(TicketService);
    private readonly destroyRef = inject(DestroyRef);

    connectedUser = computed(() => this.authService.connectedUser());
    currentUser = computed(() => {
        if (this.connectedUser().id.length > 0) {
            return this.connectedUser();
        } else {
            return this.userService.user();
        }
    });

    tickets = signal<TicketInterface[]>([]);
    qrCodeDownloadLink: SafeUrl = '';

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
            .pipe(
                tap(() => this.getUserById()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
        this.updateForm.reset();
    }

    getUserById() {
        this.userService
            .getUserById(this.currentUser().id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
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
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => this.tickets.set(response));
    }

    onChangeURL(url: SafeUrl) {
        this.qrCodeDownloadLink = url;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBase64Image(img: any) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, img.width, img.height);
        const dataURL = canvas.toDataURL('image/png');
        return dataURL;
    }

    download(i: number) {
        const qrcode = document.querySelectorAll('.qrCode');
        const doc = new jsPDF();
        if (qrcode) {
            doc.setFontSize(20);
            doc.text('Votre e-billet', 80, 30);
            doc.setFontSize(16);
            doc.text(
                ` ${this.currentUser().firstname}, veuillez présenter ce e-billet à l'entrée de votre épreuve`,
                20,
                80,
            );
            const imageData = this.getBase64Image(
                qrcode[i].firstChild?.firstChild,
            );
            doc.addImage(imageData, 'JPG', 80, 130, 50, 50);
            doc.save('ebillet.pdf');
        }
    }
}
