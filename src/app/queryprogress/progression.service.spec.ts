import { TestBed } from '@angular/core/testing';

import { ProgressionService } from './progression.service';

describe('ProgressionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressionService = TestBed.get(ProgressionService);
    expect(service).toBeTruthy();
  });
});
