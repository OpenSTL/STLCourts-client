import { Component, OnInit } from '@angular/core';
import {CitationService} from '../services/citation.service';
import {ParamMap, Router} from '@angular/router';
import {Citation} from '../models/citation';
import {MatTableDataSource} from '@angular/material';
import {CourtsService} from '../services/courts.service';
import {Court} from '../models/court';
import * as moment from 'moment-timezone';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Municipality} from '../models/municipality';
import {LegalRightsService} from '../services/legal-rights.service';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  PLACEHOLDER_DL_NUM = 'NO_DL_NUM';
  citations: Citation[];
  groupedCitations = [];

  displayedColumns = ['view', 'ticketNum', 'name', 'courtDate', 'courtLocation', 'violations'];
  dataSource;
  courts: Court[];
  municipalities: Municipality[];
  selectedCitation: Citation;

  constructor(private citationService: CitationService,
              private courtService: CourtsService,
              private muniService: MunicipalitiesService,  /* this can go once municipality paymentURL is moved to the courts */
              private legalRightsService: LegalRightsService,
              private router: Router) { }

  private groupCitationsByDL() {
    let dlNum = '';
    let dlState = '';
   // this.groupedCitations = [];
    const indexArray = [];
    let index = 0;

    this.citations.forEach((citation) => {
      dlNum = citation.drivers_license_number;
      dlState = citation.drivers_license_state;
      if (!dlNum) {
        // in the event the defendant does not have a DL Num assign one so the object has a key
        dlNum = this.PLACEHOLDER_DL_NUM;
      }
      if (isNullOrUndefined(indexArray[dlNum + dlState])) {
        indexArray[dlNum + dlState] = index++;
        this.groupedCitations.push([]);
      }
        const foundIndex = indexArray[dlNum + dlState];
        this.groupedCitations[foundIndex].push(citation);
    });
  }

  showPaymentButton() {
    if (this.selectedCitation) {
      return !!this.selectedCitation.court.paymentUrl && this.selectedCitation.canPayOnline;
    } else {
      return false;
    }
  }

  selectCitation(citation) {
    this.selectedCitation = citation;

    /* this and next section is only needed until the court on the server get updated with paymentUrl */
    const citationMuni = this.municipalities.find((municipality) => {
      return municipality.id === this.selectedCitation.municipality_id;
    });
    this.selectedCitation.court.paymentUrl = citationMuni.paymentUrl;
  }

  getCourtById(courtId: string) {
    if (!isNullOrUndefined(this.courts) && this.courts.length > 0) {
      return this.courts.find(court => {
        return court.id === courtId;
      });
    } else {
      return new Court();
    }
  }

  getLegalRightsLink() {
    return this.legalRightsService.legalRightsLink(this.selectedCitation.court);
  }

  directions() {
    window.open(this.selectedCitation.court.directionLink, '_blank');
  }

  print() {
    window.print();
  }

  ngOnInit() {
    this.citations = this.citationService.getCurrentCitations();
    this.selectedCitation = null;
    if (this.citations.length === 0) {
      this.router.navigate(['findTickets']);
    } else {
      this.groupCitationsByDL();
      const courtObs$ = this.courtService.findAll();
      const muniObs$ = this.muniService.findAll();
      /* can go back to simple courts.findAll().subscribe once court on server is updated with paymentUrl */
      Observable.zip( muniObs$, courtObs$, (munis: Municipality[], courts: Court[]) => ({munis, courts}))
        .subscribe(result => {
          this.courts = result.courts;
          this.municipalities = result.munis;
          this.citations.forEach((citation) => {
            citation.court = this.getCourtById(citation.court_id);
            /* this and next section is only needed until the court on the server get updated with paymentUrl */
            const citationMuni = this.municipalities.find((municipality) => {
              return municipality.id === citation.municipality_id;
            });
            citation.court.paymentUrl = !!citationMuni ? citationMuni.paymentUrl : '';
          });
          if (this.citations.length === 1) {
            this.selectCitation(this.citations[0]);
          }
          this.dataSource = new MatTableDataSource(this.groupedCitations);
        });
    }
  }

}
