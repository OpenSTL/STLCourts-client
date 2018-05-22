import {Violation} from './violation';
import * as moment from 'moment-timezone';
import {Court} from './court';

export class Citation {
  citation_number: string;
  citation_date: Date;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  defendant_address: string;
  defendant_city: string;
  defendant_state: string;
  drivers_license_number: string;
  drivers_license_state: string;
  court_dateTime: Date;

  violations: Violation[];
  court_id: string;
  municipality_id: string;

  court: Court; // this field is loaded after initialization;

  private _violationsFineTotal: string;
  private _missingFineInfo: boolean;
  private _hasWarrant: boolean;
  private _canPayOnline: boolean;

  fromPOJO(pojo: Citation) {
      this.citation_number = pojo.citation_number;
      this.citation_date = pojo.citation_date;
      this.first_name = pojo.first_name;
      this.last_name = pojo.last_name;
      this.date_of_birth = pojo.date_of_birth;
      this.defendant_address = pojo.defendant_address;
      this.defendant_city = pojo.defendant_city;
      this.defendant_state = pojo.defendant_state;
      this.drivers_license_number = pojo.drivers_license_number;
      this.drivers_license_state = pojo.defendant_state;
      this.court_dateTime = pojo.court_dateTime;
      this.violations = [];
      pojo.violations.forEach((pojoViolation: Violation) => {
        const violation: Violation = new Violation();
        violation.fromPOJO(pojoViolation);
        this.violations.push(violation);
      });
      this.court_id = pojo.court_id;
      this.municipality_id = pojo.municipality_id;
  }

  get violationsFineTotal(): string {
    return this._getViolationsFineTotal().toFixed(2);
  }

  private _getViolationsFineTotal(): number {
    return this.violations
      .map((violation) => {
        return parseFloat(violation.fine_amount);
      })
      .reduce((total: number, fine_amount: number): number => {
        return total + fine_amount;
      }, 0);
  }

  get missingFineInfo(): boolean {
    return isNaN(this._getViolationsFineTotal());
  }

  get hasWarrant() {
    return this.violations.some((violation): boolean => {
      return violation.warrant_status;
    });
  }

  get canPayOnline() {
    return !this.violations.some(((violation): boolean => {
      return !violation.can_pay_online;
    }));
  }

  formattedCourtTime(courtZoneId) {
    if (!!this.court_dateTime) {
      return moment.tz(this.court_dateTime, courtZoneId).format('hh:mm A z');
    } else {
      return '';
    }
  }
}
