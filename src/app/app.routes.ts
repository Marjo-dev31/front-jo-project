import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GtcComponent } from './gtc/gtc.component';
import { ErrorComponent } from './error/error.component';
import { OfferComponent } from './offer/offer.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: 'panier', component: CartComponent },
    { path: 'offers', component: OfferComponent },
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'conditionsgeneralesdevente', component: GtcComponent },
    { path: 'erreur', component: ErrorComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent },
];
