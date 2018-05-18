import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {FindCourtsComponent} from './find-courts/find-courts.component';
import {CourtsComponent} from './courts/courts.component';
import {FindTicketsComponent} from './find-tickets/find-tickets.component';
import {TicketInfoComponent} from './ticket-info/ticket-info.component';
import {TicketNotFoundComponent} from './ticket-not-found/ticket-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'findCourts', component: FindCourtsComponent, pathMatch: 'full'},
  { path: 'courts/:courtId', component: CourtsComponent},
  { path: 'findTickets', component: FindTicketsComponent, pathMatch: 'full'},
  { path: 'tickets/info', component: TicketInfoComponent, pathMatch: 'full'},
  { path: 'tickets/error/notFound', component: TicketNotFoundComponent, pathMatch: 'full'},
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
