import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferAdminComponent } from './offers-admin.component';
import { OfferService } from '../../shared/services/offer.service';
import { of } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('OffersComponent', () => {
    let component: OfferAdminComponent;
    let fixture: ComponentFixture<OfferAdminComponent>;

    const mockOfferService = {
        getAllOffers: jest.fn().mockReturnValue(
            of([
                {
                    id: 'A',
                    title: 'testtitle',
                    description: 'testdescription',
                    price: 10,
                    numberOfSales: 2,
                    imgUrl: 'testUrl',
                },
            ]),
        ),
        addImage: jest.fn().mockReturnValue(of({})),
        updateOffer: jest.fn().mockReturnValue(
            of([
                {
                    id: 'A',
                    title: 'testtitle',
                    description: 'testdescription',
                    price: 100,
                    numberOfSales: 3,
                    imgUrl: 'testUrl',
                },
            ]),
        ),
        addOffer: jest.fn().mockReturnValue(
            of([
                {
                    id: 'B',
                    title: 'Test Offer',
                    description: 'Description',
                    price: 100,
                    numberOfSales: 0,
                    imgUrl: 'image.png',
                },
            ]),
        ),
        deleteOffer: jest.fn(),
    };

    const fakeFile = new File(['hello'], 'C:\\fakepath\\image.png', {
        type: 'text/plain',
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OfferAdminComponent, ReactiveFormsModule],
            providers: [{ provide: OfferService, useValue: mockOfferService }],
        }).compileComponents();

        fixture = TestBed.createComponent(OfferAdminComponent);
        component = fixture.componentInstance;

        component.addForm = new FormGroup({
            title: new FormControl('Test Offer'),
            description: new FormControl('Description'),
            price: new FormControl(100),
            numberOfSales: new FormControl(0),
            imgUrl: new FormControl(),
        });

        component.selectedFile = fakeFile;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a new offer when offer does not exist', () => {
        component.onSubmit();

        expect(mockOfferService.addOffer).toHaveBeenCalledWith({
            title: 'Test Offer',
            description: 'Description',
            price: 100,
            numberOfSales: 0,
            imgUrl: 'image.png',
        });
    });

    it('should submit and update offer when title already exists', () => {
        component.addForm.get('title')?.setValue('testtitle');

        component.onSubmit();

        expect(mockOfferService.updateOffer).toHaveBeenCalledWith({
            id: 'A',
            title: 'testtitle',
            description: 'Description',
            price: 100,
            numberOfSales: 0,
            imgUrl: 'image.png',
        });
    });
});
