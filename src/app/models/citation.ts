import {Violation} from './violation';

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
 /*
  private _violationsFineTotal: string;

  get violationsFineTotal(): string {
    const totalFine = this.violations
      .map((violation) => {
        return parseFloat(violation.fine_amount);
      })
      .reduce((total: number, fine_amount: number): number => {
        return total + fine_amount;
      });
    // return totalFine.toFixed(2);
    return '44.44';
  }
*/
  getTotal(): string {
    return '56.56';
  }

}
