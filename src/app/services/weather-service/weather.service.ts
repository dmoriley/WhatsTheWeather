import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable()
export class WeatherService {

  //not best option to have apikey right in the service, maybe import it with something like dotenv later
  private apikey:string = '70f9e083d6fb25bc7da41bd00429558a';

  constructor(private http: Http) { }

  getForcast(city:string) {
    const query = `https://api.openweathermap.org/data/2.5/forecast?APPID=${this.apikey}&q=${city}`
    return this.http.get(query).pipe(map(res => res.json()));
  }
}
