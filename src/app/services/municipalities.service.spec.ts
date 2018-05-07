import { TestBed, inject } from '@angular/core/testing';

import { MunicipalitiesService } from './municipalities.service';

describe('MunicipalitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MunicipalitiesService]
    });
  });

  it('should be created', inject([MunicipalitiesService], (service: MunicipalitiesService) => {
    expect(service).toBeTruthy();
  }));
});
