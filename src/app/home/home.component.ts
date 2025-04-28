import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { sportingEventService } from '../shared/services/sporting-event.service';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../environments/environments';

@Component({
    selector: 'app-home',
    imports: [TitleCasePipe, NgClass, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    public activeElement = signal<string>('');
    private readonly sportingEventService = inject(sportingEventService);
    public events = toSignal(this.sportingEventService.getAllSportingEvents());

    url = `${environment.serverUrl}/sporting-event/upload/`;

    showMore(id: string) {
        this.activeElement.update(() => id);
    }

    showLess() {
        this.activeElement.update(() => '');
    }
}
