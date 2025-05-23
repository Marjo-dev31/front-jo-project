import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SportingEventService } from '../../shared/services/sporting-event.service';
import { NgStyle, TitleCasePipe } from '@angular/common';
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
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-event-admin',
    imports: [TitleCasePipe, NgStyle, ReactiveFormsModule],
    templateUrl: './event-admin.component.html',
    styles: '',
})
export class EventAdminComponent implements OnInit {
    private readonly sportingEventService = inject(SportingEventService);
    private readonly destroyRef = inject(DestroyRef);

    sportingEvents!: SportingEventInterface[];
    addFormIsShow = signal(false);
    formIsSubmitted = signal(false);
    selectedFile: File | null = null;

    addForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        imgUrl: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.getAllSportingEvents();
    }

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

    getAllSportingEvents() {
        this.sportingEventService
            .getAllSportingEvents()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                (sportingEvents) => (this.sportingEvents = sportingEvents),
            );
    }

    onSubmit() {
        // create formdata to post img type file
        const formData = new FormData();
        formData.append('file', this.selectedFile as Blob);
        this.sportingEventService
            .addImage(formData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

        // take the name of file and record in newSportingEvent
        const imgUrl = this.imgUrl.value.split('\\').slice(-1);

        const newSportingEvent: SportingEventCreateInterface = {
            title: this.title.value,
            description: this.description.value,
            imgUrl: imgUrl[0],
        };

        // check if alreadyExist and make put or post
        const sportingEventAlreadyExist = this.sportingEvents?.find(
            (el) =>
                el.title.toLowerCase() === newSportingEvent.title.toLowerCase(),
        );
        if (sportingEventAlreadyExist) {
            const updatedSportingEvent: SportingEventInterface = {
                id: sportingEventAlreadyExist.id,
                ...newSportingEvent,
            };
            this.sportingEventService
                .updateSportingEvent(updatedSportingEvent)
                .pipe(
                    tap(() => this.getAllSportingEvents()),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        } else {
            this.sportingEventService
                .addSportingEvent(newSportingEvent)
                .pipe(
                    tap(() => this.getAllSportingEvents()),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
        this.formIsSubmitted.set(true);
        this.addForm.reset();
    }

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files?.length) {
            this.selectedFile = target.files[0];
        }
    }

    deleteEvent(id: string) {
        this.sportingEventService
            .deleteEvent(id)
            .pipe(
                tap(() => this.getAllSportingEvents()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
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
