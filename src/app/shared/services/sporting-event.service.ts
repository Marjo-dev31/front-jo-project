import { Injectable } from '@angular/core';
import { SportingEventInterface } from '../models/sportingevent.interface';

@Injectable({
    providedIn: 'root',
})
export class sportingEventService {
    events: SportingEventInterface[] = [
        {
            id: '1',
            title: 'basket-ball',
            description: `Le basketball est un sport d'équipe pratiqué sur un terrain rectangulaire, sur lequel deux équipes composées de cinq joueurs s'affrontent et tentent de marquer en lançant le ballon dans le cerceau et le filet de l'adversaire, à savoir dans le panier.`,
            imgUrl: '/olympia-68773_1280.jpg',
        },
        {
            id: '2',
            title: 'rugby à 7',
            description:
                'Le rugby à 7 est le format à sept joueurs du rugby, sport qui peut également se pratiquer sous un format à 15.',
            imgUrl: '/olympia-68773_1280.jpg',
        },
        {
            id: '3',
            title: 'escalade sportive',
            description: `L'escalade sportive est une discipline moderne issue de l'escalade traditionnelle. Il existe trois disciplines différentes : le bloc, la difficulté et la vitesse. Dans chacune d'entre elles, des points d'ancrage sont fixés à un mur artificiel pour permettre la grimpe.`,
            imgUrl: '/olympia-68773_1280.jpg',
        },
        {
            id: '4',
            title: 'natation',
            description: `Autrefois principalement destinée au commerce et au transport sur de longues distances, la voile, ou l'art de déplacer un bateau ou une embarcation similaire en se servant des vagues et du vent, est aujourd'hui essentiellement une activité sportive.`,
            imgUrl: '/olympia-68773_1280.jpg',
        },
    ];
}
