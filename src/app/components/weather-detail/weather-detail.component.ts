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
  city;
  data;
  forecast;
  badCity = false;

  constructor(private weatherService: WeatherService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const city = this.route.snapshot.queryParamMap.get('city');
    if(!city) { //if navigate to this page without city param redirect back to main page
      this.router.navigate(['/']);
    }
    this.weatherService.getForcast(city).pipe(take(1)).subscribe(data => {
      console.log(JSON.stringify(data));
      this.data = data.list;
      this.city = data.city.name;
      this.accumulateData();

    }, err => {
      this.city = city;
      this.badCity =true; 
    });
  }

  /**
   * Accumumlate the data because api returns 5 days in 3 hour increments
   */
  private accumulateData() {
    let counter = {};
    this.forecast = this.data.reduce((acc, val, index, array) => {
      let date = val.dt_txt.split(" ")[0]; //get rid of timestamp
      acc.pressure += val.main.pressure; //accumulate the pressure for the week;

      if(acc.days.length === 0) { //empty array add first value avoid null errors

        acc.days.push({
          date, 
          high: val.main.temp_max,
          low: val.main.temp_min
        });
        counter[date] = 1;

      } else {
        const i = acc.days.length-1;

        if(acc.days[i].date === date) { //if its still the same date

          acc.days[i].high += val.main.temp_max;
          acc.days[i].low += val.main.temp_min;
          counter[date]++; //increment counter for that day

          //check if last element of array
          if(index === array.length-1) {
            acc.days[i].high = acc.days[i].high/counter[date];
            acc.days[i].low = acc.days[i].low/counter[date];
            acc.pressure = acc.pressure/array.length-1; //calc average pressure.
          }

        } else { //new date new object

          //calc averages for last day
          acc.days[i].high = acc.days[i].high/counter[acc.days[i].date];
          acc.days[i].low = acc.days[i].low/counter[acc.days[i].date];

          //push new day onto array
          acc.days.push({
            date, 
            high: val.main.temp_max,
            low: val.main.temp_min         
          });
          counter[date] = 1;

        }

      }
      return acc;
    },{pressure:0, days:[]}); 
  }

}
