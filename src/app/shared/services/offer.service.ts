import { Injectable } from '@angular/core';
import { OfferInterface } from '../models/offer.interface';

@Injectable({
    providedIn: 'root',
})
export class OfferService {
    offers: OfferInterface[] = [
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
