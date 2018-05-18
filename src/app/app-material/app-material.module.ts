import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatMenuModule,
         MatIconModule,
         MatToolbarModule,
         MatInputModule,
         MatRadioModule,
         MatTooltipModule,
         MatAutocompleteModule
} from '@angular/material';

import {MatGridListModule} from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class AppMaterialModule { }
