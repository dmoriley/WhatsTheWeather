import { ScrubberService } from './services/scrubber-service/scrubber.service';
import { WeatherService } from './services/weather-service/weather.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LandingComponent } from './components/landing/landing.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

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
    AppComponent
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
