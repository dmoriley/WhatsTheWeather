import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'weather-detail-item',
  templateUrl: './weather-detail-item.component.html',
  styleUrls: ['./weather-detail-item.component.scss']
})
export class WeatherDetailItemComponent implements OnInit {

  @Input('forecastData')forecastData; //in future could provide interface for this data

  constructor() { }

  ngOnInit() {
  }

}
