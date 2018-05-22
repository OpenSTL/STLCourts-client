import { TestBed, inject } from '@angular/core/testing';

import { SmsinfoService } from './smsinfo.service';

describe('SmsinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsinfoService]
    });
  });

  xit('should be created', inject([SmsinfoService], (service: SmsinfoService) => {
    expect(service).toBeTruthy();
  }));
});
