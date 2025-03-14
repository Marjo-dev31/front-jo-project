import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-offer',
    imports: [CurrencyPipe, TitleCasePipe, NgClass],
    templateUrl: './offer.component.html',
    styleUrl: './offer.component.css',
})
export class OfferComponent {
    offers = [
        {
            id: '1',
            title: 'solo',
            description:
                "L'offre est valable pour une personne à la date choisie pour l'épreuve sélectionnée",
            price: 100,
            numberOfSales: 0,
            imgUrl: '/olympia-68773_1280.jpg',
        },
        {
            id: '2',
            title: 'duo',
            description:
                "L'offre duo est valable pour une entrée pour 2 personnes à la date choisie et pour l'épreuve sélectionnée",
            price: 175,
            numberOfSales: 0,
            imgUrl: '/olympia-68773_1280.jpg',
        },
        {
            id: '3',
            title: 'famille',
            description:
                "L'offre famille est valable pour une entrée pour 4 personnes à la date choisie et pour l'épreuve sélectionnée",
            price: 300,
            numberOfSales: 0,
            imgUrl: '/olympia-68773_1280.jpg',
        },
    ];
}
