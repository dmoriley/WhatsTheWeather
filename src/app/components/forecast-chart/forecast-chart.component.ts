import { ForecastData } from './../../models/forecast-data.model';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.scss']
})
export class ForecastChartComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input('forecast') forecast: ForecastData;

  chart = [];

  constructor() { }

  // ngOnInit() {
  // }

  ngAfterViewInit() {
    let ctx = this.canvas.nativeElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.forecast.days.map(val => val.date),
        datasets: [
          {
            data: this.forecast.days.map(val => val.high),
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {display: false},
        scales: {
          xAxes: [{
            display:true
          }],
          yAxes: [{
            display:true
          }]
        }
      }
    });
    
    // this.chart = new Chart(ctx, {
    //   type: 'line',
    //   data: this.forecast.days.map(val => val.high),
    //   options: {}
    // });
  }

}
