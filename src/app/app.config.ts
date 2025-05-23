import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
    provideHttpClient,
    withFetch,
    withInterceptors,
} from '@angular/common/http';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withFetch(),
            withInterceptors([errorInterceptor, authInterceptor]),
        ),
    ],
};
