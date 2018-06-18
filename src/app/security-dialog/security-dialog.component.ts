import {Component, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialogRef} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment-timezone';

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-security-dialog',
  templateUrl: './security-dialog.component.html',
  styleUrls: ['./security-dialog.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-us'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class SecurityDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<SecurityDialogComponent>,
              private formBuilder: FormBuilder) { }

  results() {
    return { dob: this.form.get('dob').value ? this.form.get('dob').value.format('YYYY-MM-DD') : null,
             lastName: this.form.get('lastName').value
           };
  }

  closeDialog() {
    if (this.form.get('dob').valid && this.form.get('lastName').valid) {
      this.dialogRef.close(this.results());
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  validDobDate(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const dobRegex: RegExp = /((?:0[1-9])|(?:1[0-2]))\/((?:0[0-9])|(?:[1-2][0-9])|(?:3[0-1]))\/(\d{4})/;

      if (moment.isMoment(control.value)) {
        let input = control.value.creationData().input;
        if (typeof input !== 'string') {
          input = control.value.format('MM/DD/YYYY');
        }
        if (dobRegex.test(input)) {
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

  ngOnInit() {
    this.form = this.formBuilder.group({
      dob: ['', [Validators.required, this.validDobDate()]],
      lastName: ['', Validators.required]
    });
  }
}
