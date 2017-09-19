import { TestBed, inject } from '@angular/core/testing';

import { TsvService } from './tsv.service';

describe('TsvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TsvService]
    });
  });

  it('should be created', inject([TsvService], (service: TsvService) => {
    expect(service).toBeTruthy();
  }));
});
