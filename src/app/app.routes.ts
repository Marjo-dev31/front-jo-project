import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GtcComponent } from './gtc/gtc.component';
import { ErrorComponent } from './error/error.component';
import { OfferComponent } from './offer/offer.component';

export const routes: Routes = [
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'conditionsgeneralesdevente', component: GtcComponent },
    { path: 'erreur', component: ErrorComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent },
    { path: 'offers', component: OfferComponent },
];

