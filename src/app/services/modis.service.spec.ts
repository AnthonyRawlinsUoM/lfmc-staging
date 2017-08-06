import { TestBed, inject } from '@angular/core/testing';

import { ModisService } from './modis.service';

describe('ModisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModisService]
    });
  });

  it('should be created', inject([ModisService], (service: ModisService) => {
    expect(service).toBeTruthy();
  }));
});
