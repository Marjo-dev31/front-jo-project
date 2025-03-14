import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `<app-header />
        <main><router-outlet /></main>
        <app-footer class="mt-auto" />`,
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'front-jo';
}
