import { OfferInterface } from "./offer.interface";
import { SportingEventInterface } from "./sportingevent.interface";

export interface TicketInterface {
  id: string,
  offer: OfferInterface,
  sportingEvent: SportingEventInterface,
  ticketKey: string;
  createAt: Date

}