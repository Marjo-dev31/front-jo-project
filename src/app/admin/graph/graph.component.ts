import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { OfferService } from '../../shared/services/offer.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
Chart.register(...registerables);

@Component({
    selector: 'app-graph',
    imports: [],
    templateUrl: './graph.component.html',
    styles: '',
})
export class GraphComponent implements OnInit {
    private readonly OfferService = inject(OfferService);
    private readonly destroyRef = inject(DestroyRef);

    offers = toSignal(this.OfferService.getAllOffers());
    chart!: Chart;

    ngOnInit() {
        this.OfferService.getAllOffers()
            .pipe(
                map((el) =>
                    el.map((item) => {
                        return item.title;
                    }),
                ),
            )
            .subscribe((t) => {
                this.OfferService.getAllOffers()
                    .pipe(
                        map((el) =>
                            el.map((el) => {
                                return el.numberOfSales;
                            }),
                        ),
                        takeUntilDestroyed(this.destroyRef),
                    )
                    .subscribe((n) => {
                        const config: ChartConfiguration = {
                            type: 'bar',
                            data: {
                                labels: t,
                                datasets: [
                                    {
                                        label: 'Nombre de ventes par offres',
                                        data: n,
                                        backgroundColor: [
                                            'rgba(61, 90, 128, 0.2)',
                                            'rgba(152, 193, 217, 0.2)',
                                            'rgba(238, 108, 77, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgb(61, 90, 128)',
                                            'rgb(152, 193, 217)',
                                            'rgb(238, 108, 77)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            },
                        };
                        this.chart = new Chart('myChart', config);
                    });
            });
    }
}
