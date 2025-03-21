import { Component, inject, signal } from '@angular/core';
import { sportingEventService } from '../../shared/services/sporting-event.service';
import { SportingEventInterface } from '../../shared/models/sportingevent.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-event-admin',
    imports: [TitleCasePipe],
    templateUrl: './event-admin.component.html',
    styleUrl: './event-admin.component.css',
})
export class EventAdminComponent {
    private readonly sportingEventService = inject(sportingEventService);

    sportingEvents = signal<SportingEventInterface[]>(
        this.sportingEventService.events,
    );
}
