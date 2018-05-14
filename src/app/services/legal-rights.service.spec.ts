import { TestBed, inject } from '@angular/core/testing';

import { LegalRightsService } from './legal-rights.service';

describe('LegalRightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalRightsService]
    });
  });

  it('should be created', inject([LegalRightsService], (service: LegalRightsService) => {
    expect(service).toBeTruthy();
  }));
});
