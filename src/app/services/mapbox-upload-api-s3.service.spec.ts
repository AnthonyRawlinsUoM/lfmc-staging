import { TestBed, inject } from '@angular/core/testing';

import { MapboxUploadAPIS3Service } from './mapbox-upload-api-s3.service';

describe('MapboxUploadAPIS3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapboxUploadAPIS3Service]
    });
  });

  it('should be created', inject([MapboxUploadAPIS3Service], (service: MapboxUploadAPIS3Service) => {
    expect(service).toBeTruthy();
  }));
});
