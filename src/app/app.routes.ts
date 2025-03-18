import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: '', component: HomeComponent },
];
