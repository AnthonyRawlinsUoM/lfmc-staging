import { TestBed } from '@angular/core/testing';

import { TemporalService } from './temporal.service';

describe('TemporalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemporalService = TestBed.get(TemporalService);
    expect(service).toBeTruthy();
  });
});
