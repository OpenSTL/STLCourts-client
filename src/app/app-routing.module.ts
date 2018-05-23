import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {FindCourtsComponent} from './find-courts/find-courts.component';
import {CourtsComponent} from './courts/courts.component';
import {FindTicketsComponent} from './find-tickets/find-tickets.component';
import {TicketInfoComponent} from './ticket-info/ticket-info.component';
import {TicketNotFoundComponent} from './ticket-not-found/ticket-not-found.component';
import {AboutComponent} from './about/about.component';
import {FaqComponent} from './faq/faq.component';
import {SmsTicketLookupComponent} from './sms-ticket-lookup/sms-ticket-lookup.component';
import {GoingToCourtComponent} from './going-to-court/going-to-court.component';
import {CommunityServiceComponent} from './community-service/community-service.component';
import {LegalComponent} from './legal/legal.component';
import {PrivacyComponent} from './privacy/privacy.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'findCourts', component: FindCourtsComponent, pathMatch: 'full'},
  { path: 'courts/:courtId', component: CourtsComponent},
  { path: 'findTickets', component: FindTicketsComponent, pathMatch: 'full'},
  { path: 'tickets/info', component: TicketInfoComponent, pathMatch: 'full'},
  { path: 'tickets/error/notFound', component: TicketNotFoundComponent, pathMatch: 'full'},
  { path: 'about', component: AboutComponent, pathMatch: 'full'},
  { path: 'help', component: FaqComponent, pathMatch: 'full'},
  { path: 'tickets/:ticketNum/info', component: SmsTicketLookupComponent, pathMatch: 'full'},
  { path: 'goingToCourt', component: GoingToCourtComponent, pathMatch: 'full'},
  { path: 'communityService', component: CommunityServiceComponent, pathMatch: 'full'},
  { path: 'legal', component: LegalComponent, pathMatch: 'full'},
  { path: 'privacy', component: PrivacyComponent, pathMatch: 'full'},
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
