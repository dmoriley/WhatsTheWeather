import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from './../../services/weather-service/weather.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {

  forecast;

  constructor(private weatherService: WeatherService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const city = this.route.snapshot.queryParamMap.get('city');
    if(!city) {
      this.router.navigate(['/']);
    }
    this.weatherService.getForcast(city).pipe(take(1)).subscribe(data => {
      this.forecast = data.list;
    });
  }

}
