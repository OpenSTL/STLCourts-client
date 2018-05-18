import { Component } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialogRef} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-security-dialog',
  templateUrl: './security-dialog.component.html',
  styleUrls: ['./security-dialog.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-us'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SecurityDialogComponent {
  dobCtrl: FormControl = new FormControl('',
    [Validators.required,
      this.validDobDate()
    ]);
  lastNameCtrl: FormControl = new FormControl('', [Validators.required]);

  constructor(private dialogRef: MatDialogRef<SecurityDialogComponent>) { }

  results() {
    return { dob: this.dobCtrl.value ? this.dobCtrl.value.format('YYYY-MM-DD') : null,
             lastName: this.lastNameCtrl.value
           };
  }

  closeDialog() {
    if (this.dobCtrl.valid && this.lastNameCtrl.valid) {
      this.dialogRef.close(this.results());
    } else {
      // trigger showing error messages
    }
  }

  validDobDate(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const dobRegex: RegExp = /((?:0[1-9])|(?:1[0-2]))\/((?:0[0-9])|(?:[1-2][0-9])|(?:3[0-1]))\/(\d{4})/;

      if (moment.isMoment(control.value)) {
        const input = control.value.creationData().input;
        if (typeof input === 'string' && (dobRegex).test(input)) {
          const years = moment().diff( moment(control.value), 'years', false);
          if (years < 21) {
            return {'validDobDate': 'You must be at least 21 years old to use this site.'};
          } else {
            return null;
          }
        }
      }

      return {'validDobDate': 'DOB is not a valid date. Please use format MM/DD/YYYY'};

    };
  }
}
