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

import { MatChipsModule } from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';



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
    MatChipsModule
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
    MatChipsModule
  ],
  declarations: []
})
export class AppMaterialModule { }
