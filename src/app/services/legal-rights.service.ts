import { Injectable } from '@angular/core';
import {Court} from '../models/court';

@Injectable()
export class LegalRightsService {

  constructor() { }

  openLegalRightsLink(court: Court) {
    window.open(this.legalRightsLink(court), '_blank');
  }

  legalRightsLink(court: Court) {
    let rightsLink = '';
    if (court) {
      if (court.rights_type === 'PDF') {
        if (court.rights_value) {
          rightsLink += 'assets/court_rights/' + court.rights_value;
        } else {
          rightsLink += 'assets/court_rights/Default.pdf';
        }
      } else {
        rightsLink = court.rights_value;
      }
    }
    return rightsLink;
  }


}
