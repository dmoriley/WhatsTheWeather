import { TestBed } from '@angular/core/testing';

import { ScrubberService } from './scrubber.service';

describe('ScrubberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrubberService = TestBed.get(ScrubberService);
    expect(service).toBeTruthy();
  });
});
