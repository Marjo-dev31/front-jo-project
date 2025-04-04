import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GtcComponent } from './gtc/gtc.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { OfferComponent } from './offer/offer.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { OfferAdminComponent } from './admin/offers/offers-admin.component';
import { EventAdminComponent } from './admin/events/event-admin.component';
import { GraphComponent } from './admin/graph/graph.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';
import { roleGuard } from './shared/guards/role.guard';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'panier', component: CartComponent },
    { path: 'offers', component: OfferComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'espacepersonnel',
        component: AccountComponent,
        canActivate: [authGuard],
    },
    {
        path: 'backoffice',
        component: AdminComponent,
        canActivate: [roleGuard, authGuard],
        data: { isAdmin: [true] },
        children: [
            { path: 'offers', component: OfferAdminComponent },
            { path: 'sportingevents', component: EventAdminComponent },
            { path: 'sales', component: GraphComponent },
        ],
    },
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'conditionsgeneralesdevente', component: GtcComponent },
    { path: 'erreur', component: ErrorComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
