import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {FindCourtsComponent} from './find-courts/find-courts.component';
import {CourtsComponent} from './courts/courts.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'findCourts', component: FindCourtsComponent, pathMatch: 'full'},
  { path: 'courts/:courtId', component: CourtsComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
