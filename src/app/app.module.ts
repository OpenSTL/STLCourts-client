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
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CourtsComponent } from './courts/courts.component';
import { CourtTitleHeaderComponent } from './court-title-header/court-title-header.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {LegalRightsService} from './services/legal-rights.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FindCourtsComponent,
    CourtsComponent,
    CourtTitleHeaderComponent
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
    LeafletModule.forRoot()
  ],
  providers: [
    Title,
    ContactService,
    CourtsService,
    MunicipalitiesService,
    LegalRightsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
