import { TemperaturePipe } from './pipes/temperature.pipe';
import { ScrubberService } from './services/scrubber-service/scrubber.service';
import { WeatherService } from './services/weather-service/weather.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LandingComponent } from './components/landing/landing.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WeatherDetailItemComponent } from './components/weather-detail-item/weather-detail-item.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'forecast',
    component: WeatherDetailComponent
  },
];

@NgModule({
  declarations: [
    LandingComponent,
    WeatherDetailComponent,
    AppComponent,
    WeatherDetailItemComponent,
    TemperaturePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash:true})
  ],
  providers: [WeatherService, ScrubberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
