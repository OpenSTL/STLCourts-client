import { TestBed, inject } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactService]
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the correct email', inject( [ContactService], (contactService: ContactService) => {
    expect(contactService.email).toEqual('info@civtechstl.com');
  }));
});
