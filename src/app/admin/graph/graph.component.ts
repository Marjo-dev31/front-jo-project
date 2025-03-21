import { Component, inject, OnInit, signal } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { OfferInterface } from '../../shared/models/offer.interface';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
    selector: 'app-graph',
    imports: [],
    templateUrl: './graph.component.html',
    styleUrl: './graph.component.css',
})
export class GraphComponent implements OnInit {
    private readonly OfferService = inject(OfferService);

    offers = signal<OfferInterface[]>(this.OfferService.offers);
    offersTitle: string[] = [];
    numberOfSales: number[] = [];
    chart!: Chart;

    config: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: this.offersTitle,
            datasets: [
                {
                    label: 'Nombre de ventes par offres',
                    data: [10, 12, 1],
                    backgroundColor: '#3d5a80',
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    ngOnInit() {
        this.chart = new Chart('myChart', this.config);
        this.getTitle();
        this.getNumberOfSales();
    }

    getTitle() {
        this.offers().forEach((el) => this.offersTitle.push(el.title));
    }

    getNumberOfSales() {
        this.offers().forEach((el) =>
            this.numberOfSales.push(el.numberOfSales),
        );
    }
}
