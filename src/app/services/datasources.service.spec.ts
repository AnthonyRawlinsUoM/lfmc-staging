import { TestBed, inject } from '@angular/core/testing';

import { DatasourcesService } from './datasources.service';

describe('DatasourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasourcesService]
    });
  });

  it('should be created', inject([DatasourcesService], (service: DatasourcesService) => {
    expect(service).toBeTruthy();
  }));
});
