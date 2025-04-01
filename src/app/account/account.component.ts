import { Component } from '@angular/core';

@Component({
    selector: 'app-account',
    imports: [],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountComponent {
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
