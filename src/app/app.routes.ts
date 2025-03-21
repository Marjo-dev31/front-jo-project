import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GtcComponent } from './gtc/gtc.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { OfferComponent } from './offer/offer.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: 'panier', component: CartComponent },
    { path: 'offers', component: OfferComponent },
    { path: 'backoffice', component: AdminComponent },
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'conditionsgeneralesdevente', component: GtcComponent },
    { path: 'erreur', component: ErrorComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent },
];
