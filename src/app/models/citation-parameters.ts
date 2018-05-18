import {HttpParams} from '@angular/common/http';
import {nullSafeIsEquivalent} from '@angular/compiler/src/output/output_ast';

export class CitationParameters {
  dob: string = null;
  lastName: string = null;
  citationNumber: string = null;
  licenseNumber: string = null;
  licenseState: string = null;
  municipalityIds: string[] = null;

  constructor(dob, lastName, citationNumber, licenseNumber, licenseState, municipalityIds) {
    this.dob = dob;
    this.lastName = lastName;
    this.citationNumber = (citationNumber === '' || citationNumber === null) ? null : citationNumber;
    this.licenseNumber = (licenseNumber === '' || licenseNumber === null) ? null : licenseNumber;
    this.licenseState = (licenseState === '' || licenseState === null) ? null : licenseState;
    this.municipalityIds = (municipalityIds && municipalityIds.length > 0) ? municipalityIds : null;
  }

  getHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('dob', this.dob);
    httpParams = httpParams.append('lastName', this.lastName);
    if (this.citationNumber) {
      httpParams = httpParams.append('citationNumber', this.citationNumber);
    }
    if (this.licenseNumber) {
      httpParams = httpParams.append('licenseNumber', this.licenseNumber);
    }
    if (this.licenseState) {
      httpParams = httpParams.append('licenseState', this.licenseState);
    }
    if (this.municipalityIds) {
      this.municipalityIds.forEach((municipalityId) => {
        httpParams = httpParams.append('municipalityIds', municipalityId);
      });
    }

    return httpParams;
  }
}
