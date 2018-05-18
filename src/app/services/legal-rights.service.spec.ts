import {TestBed, getTestBed} from '@angular/core/testing';

import { LegalRightsService } from './legal-rights.service';
import {Court} from '../models/court';

describe('LegalRightsService', () => {
  let injector;
  let service: LegalRightsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalRightsService]
    });

    injector = getTestBed();
    service = injector.get(LegalRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open correct legalRightsLink', () => {
    spyOn(window, 'open');
    const court = new Court();
    court.rights_type = 'PDF';
    court.rights_value = 'me.pdf';

    let expectedRightsLink = 'assets/court_rights/me.pdf';
    service.openLegalRightsLink(court);
    expect(window.open).toHaveBeenCalledWith(expectedRightsLink, '_blank');

    court.rights_type = 'PDF';
    court.rights_value = '';

    expectedRightsLink = 'assets/court_rights/Default.pdf';
    service.openLegalRightsLink(court);
    expect(window.open).toHaveBeenCalledWith(expectedRightsLink, '_blank');

    court.rights_type = 'LINK';
    court.rights_value = 'someLink';

    service.openLegalRightsLink(court);
    expect(window.open).toHaveBeenCalledWith('someLink', '_blank');
  });
});
