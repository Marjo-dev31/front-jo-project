import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GtcComponent } from './gtc/gtc.component';

export const routes: Routes = [
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'conditionsgeneralesdevente', component: GtcComponent },
    { path: '', component: HomeComponent },
];
