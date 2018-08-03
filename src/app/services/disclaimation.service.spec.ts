import { TestBed, inject } from '@angular/core/testing';

import { DisclaimationService } from './disclaimation.service';

describe('DisclaimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisclaimationService]
    });
  });

  it('should be created', inject([DisclaimationService], (service: DisclaimationService) => {
    expect(service).toBeTruthy();
  }));
});
