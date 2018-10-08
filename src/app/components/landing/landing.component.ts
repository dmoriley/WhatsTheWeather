import { ScrubberService, ScrubberConfig } from './../../services/scrubber-service/scrubber.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  defaultLocation = 'Toronto, CA';

  constructor(private router: Router, private scrubber: ScrubberService ) { }

  ngOnInit() {
  }

  getForcast(location) {
    if(!location) {
      location = this.defaultLocation;
    }
    const scrubberConfig: ScrubberConfig = {
      exceptions: [
        {character: ',', amount:1},
      ]
    }
    //string is scrubbed to only include letters and one possible comma.
    location = this.scrubber.scrubString(location,scrubberConfig);
    this.router.navigate(['/forecast'],{queryParams:{city:location}});
  }

}
