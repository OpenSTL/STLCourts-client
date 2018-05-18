import { Component } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormControl} from '@angular/forms';

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
  dobCtrl: FormControl = new FormControl();
  lastNameCtrl: FormControl = new FormControl();

  constructor() { }

  results() {
    return { dob: this.dobCtrl.value ? this.dobCtrl.value.format('YYYY-MM-DD') : null,
             lastName: this.lastNameCtrl.value
           };
  }

}
