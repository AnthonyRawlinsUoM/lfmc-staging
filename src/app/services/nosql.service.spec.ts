import { TestBed, inject } from '@angular/core/testing';

import { NosqlService } from './nosql.service';

describe('NosqlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NosqlService]
    });
  });

  it('should be created', inject([NosqlService], (service: NosqlService) => {
    expect(service).toBeTruthy();
  }));
});
