import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SportingEventsService } from '../shared/services/sporting-events.service';

@Component({
    selector: 'app-home',
    imports: [TitleCasePipe, NgClass],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    public activeElement = signal<string>('');
    private readonly sportingEventsService = inject(SportingEventsService);
    public events = this.sportingEventsService.events;

    showMore(id: string) {
        this.activeElement.update(() => id);
    }

    showLess() {
        this.activeElement.update(() => '');
    }
}
