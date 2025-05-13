import { OfferInterface } from './offer.interface';
import { orderInterface } from './order.interface';
import { SportingEventInterface } from './sportingevent.interface';

export interface TicketInterface {
    id: string;
    offer: OfferInterface;
    sportingEvent: SportingEventInterface;
    order: orderInterface;
    ticketKey: string;
    createAt: Date;
}
