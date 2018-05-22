import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule} from './app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import {ContactService} from './services/contact.service';
import { FindCourtsComponent } from './find-courts/find-courts.component';
import {CourtsService} from './services/courts.service';
import {MunicipalitiesService} from './services/municipalities.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CourtsComponent } from './courts/courts.component';
import { CourtTitleHeaderComponent } from './court-title-header/court-title-header.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {LegalRightsService} from './services/legal-rights.service';
import { FindTicketsComponent } from './find-tickets/find-tickets.component';
import { SecurityDialogComponent } from './security-dialog/security-dialog.component';
import { CitationTitleHeaderComponent } from './citation-title-header/citation-title-header.component';
import {MomentTimezoneModule} from 'angular-moment-timezone';
import {MomentModule} from 'ngx-moment';
import {UsStatesService} from './services/us-states.service';
import { MapSelectDialogComponent } from './map-select-dialog/map-select-dialog.component';
import { SelectedMunicipalitiesComponent } from './selected-municipalities/selected-municipalities.component';
import {SnackBarService} from './services/snack-bar.service';
import {CitationService} from './services/citation.service';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { TicketNotFoundComponent } from './ticket-not-found/ticket-not-found.component';
import { AboutComponent } from './about/about.component';
import { GoingToCourtComponent } from './going-to-court/going-to-court.component';
import {SmsinfoService} from './services/smsinfo.service';
import { LegalComponent } from './legal/legal.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CommunityServiceComponent } from './community-service/community-service.component';

import {NgxPageScrollModule} from 'ngx-page-scroll';
import {LoaderInterceptorService} from './interceptors/loader-interceptor.service';
import { LoadingComponent } from './loading/loading.component';
import {LoaderService} from './services/loader.service';

import {OverlayModule} from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FindCourtsComponent,
    CourtsComponent,
    CourtTitleHeaderComponent,
    FindTicketsComponent,
    SecurityDialogComponent,
    CitationTitleHeaderComponent,
    MapSelectDialogComponent,
    SelectedMunicipalitiesComponent,
    TicketInfoComponent,
    TicketNotFoundComponent,
    LoadingComponent,
    GoingToCourtComponent,
    AboutComponent,
    LegalComponent,
    PrivacyComponent,
    CommunityServiceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    MomentModule,
    MomentTimezoneModule,
    NgxPageScrollModule,
    OverlayModule
  ],
  providers: [
    Title,
    ContactService,
    CourtsService,
    MunicipalitiesService,
    LegalRightsService,
    UsStatesService,
    SnackBarService,
    CitationService,
    SmsinfoService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    }
  ],
  entryComponents: [
    SecurityDialogComponent,
    MapSelectDialogComponent,
    LoadingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
