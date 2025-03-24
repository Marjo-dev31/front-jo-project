import { Component, inject } from '@angular/core';
import { sportingEventService } from '../../shared/services/sporting-event.service';
import { TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-event-admin',
    imports: [TitleCasePipe],
    templateUrl: './event-admin.component.html',
    styleUrl: './event-admin.component.css',
})
export class EventAdminComponent {
    private readonly sportingEventService = inject(sportingEventService);

    sportingEvents = toSignal(this.sportingEventService.getAllSportingEvents());
}
