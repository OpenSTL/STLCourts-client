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
import {MatCardModule} from '@angular/material/card';



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
    MatCardModule
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
    MatCardModule
  ],
  declarations: []
})
export class AppMaterialModule { }
