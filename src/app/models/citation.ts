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
}
