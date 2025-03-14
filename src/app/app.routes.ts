import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'offers', component: OfferComponent },
];
