import { Component, inject, signal } from '@angular/core';
import { sportingEventService } from '../../shared/services/sporting-event.service';
import { NgStyle, TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SportingEventInterface } from '../../shared/models/sportingevent.interface';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-event-admin',
    imports: [TitleCasePipe, NgStyle, ReactiveFormsModule],
    templateUrl: './event-admin.component.html',
    styleUrl: './event-admin.component.css',
})
export class EventAdminComponent {
    private readonly sportingEventService = inject(sportingEventService);

    sportingEvents = toSignal(this.sportingEventService.getAllSportingEvents());
    addFormIsShow = signal(false);
    formIsSubmitted = signal(false);
    selectedFile: File | null = null;

    addForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        imgUrl: new FormControl('', [Validators.required]),
    });

    showAddForm() {
        this.addFormIsShow.update((value) => !value);
        this.addForm.reset();
    }

    showEditForm(sportingEvent: SportingEventInterface) {
        this.addFormIsShow.set(true);
        this.addForm.patchValue({
            title: sportingEvent.title,
            description: sportingEvent.description,
        });
    }

    // a faire
    onSubmit() {
        console.log('toto', this.addForm.value);
    }

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files?.length) {
            this.selectedFile = target.files[0];
        }
    }

    deleteEvent(id: string) {
        this.sportingEventService.deleteEvent(id).subscribe();
    }

    get title() {
        return this.addForm.get('title') as FormControl;
    }
    get description() {
        return this.addForm.get('description') as FormControl;
    }
    get imgUrl() {
        return this.addForm.get('imgUrl') as FormControl;
    }
}
