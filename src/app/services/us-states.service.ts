import { Injectable } from '@angular/core';
import {State} from '../models/state';

@Injectable()
export class UsStatesService {
  constructor() { }

  private usStates = [
    new State('Alabama', 'AL'),
    new State('Alaska', 'AK'),
    new State('American Samoa', 'AS'),
    new State('Arizona', 'AZ'),
    new State('Arkansas', 'AR'),
    new State('California', 'CA'),
    new State('Colorado', 'CO'),
    new State('Connecticut', 'CT'),
    new State('Delaware', 'DE'),
    new State('District Of Columbia', 'DC'),
    new State('Federated States of Micronesia', 'FM'),
    new State('Florida', 'FL'),
    new State('Georgia', 'GA'),
    new State('Guam', 'GU'),
    new State('Hawaii', 'HI'),
    new State('Idaho', 'ID'),
    new State('Illinois', 'IL'),
    new State('Indiana', 'IN'),
    new State('Iowa', 'IA'),
    new State('Kansas', 'KS'),
    new State('Kentucky', 'KY'),
    new State('Louisiana', 'LA'),
    new State('Maine', 'ME'),
    new State('Marshall Islands', 'MH'),
    new State('Maryland', 'MD'),
    new State('Massachusetts', 'MA'),
    new State('Michigan', 'MI'),
    new State('Minnesota', 'MN'),
    new State('Mississippi', 'MS'),
    new State('Missouri', 'MO'),
    new State('Montana', 'MT'),
    new State('Nebraska', 'NE'),
    new State('Nevada', 'NV'),
    new State('New Hampshire', 'NH'),
    new State('New Jersey', 'NJ'),
    new State('New Mexicao', 'NM'),
    new State('New York', 'NY'),
    new State('North Carolina', 'NC'),
    new State('North Dakota', 'ND'),
    new State('Northern Mariana Islands', 'MP'),
    new State('Ohio', 'OH'),
    new State('Oklahoma', 'OK'),
    new State('Oregon', 'OR'),
    new State('Palau', 'PW'),
    new State('Pennsylvania', 'PA'),
    new State('Puerto Rico',  'PR'),
    new State('Rhode Island', 'RI'),
    new State('South Carolina', 'SC'),
    new State('South Dakota', 'SD'),
    new State('Tennessee', 'TN'),
    new State('Texas', 'TX'),
    new State('Utah', 'UT'),
    new State('Vermont', 'VT'),
    new State('Virgin Islands', 'VI'),
    new State('Virginia', 'VA'),
    new State('Washington', 'WA'),
    new State('West Virginia', 'WV'),
    new State('Wisconsin', 'WI'),
    new State('Wyoming', 'WY')
  ];

  getStates() {
    return this.usStates;
  }

}
