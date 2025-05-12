import { Component, inject, signal } from '@angular/core';
import { SportingEventService } from '../../shared/services/sporting-event.service';
import { NgStyle, TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    SportingEventCreateInterface,
    SportingEventInterface,
} from '../../shared/models/sportingevent.interface';
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
    styles: '',
})
export class EventAdminComponent {
    private readonly sportingEventService = inject(SportingEventService);

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

    onSubmit() {
        // create formdata to post img type file
        const formData = new FormData();
        formData.append('file', this.selectedFile as Blob);
        this.sportingEventService.addImage(formData).subscribe();

        // take the name of file and record in newSportingEvent
        const imgUrl = this.imgUrl.value.split('\\').slice(-1);

        const newSportingEvent: SportingEventCreateInterface = {
            title: this.title.value,
            description: this.description.value,
            imgUrl: imgUrl[0],
        };

        // check if alreadyExist and make put or post
        const sportingEventAlreadyExist = this.sportingEvents()?.find(
            (el) => el.title === newSportingEvent.title,
        );
        if (sportingEventAlreadyExist) {
            const updatedSportingEvent: SportingEventInterface = {
                id: sportingEventAlreadyExist.id,
                ...newSportingEvent,
            };
            this.sportingEventService
                .updateSportingEvent(updatedSportingEvent)
                .subscribe();
        } else {
            this.sportingEventService
                .addSportingEvent(newSportingEvent)
                .subscribe();
        }
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
