import { Component, OnInit } from '@angular/core';
import {CitationService} from '../services/citation.service';
import {Router} from '@angular/router';
import {Citation} from '../models/citation';
import {MatTableDataSource} from '@angular/material';
import {CourtsService} from '../services/courts.service';
import {Court} from '../models/court';
import * as moment from 'moment-timezone';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  PLACEHOLDER_DL_NUM = 'NO_DL_NUM';
  citations: Citation[];
  groupedCitations: any;

  displayedColumns = ['view', 'ticketNum', 'name', 'courtDate', 'courtLocation', 'violations'];
  dataSource;
  courts: Court[];
  citationCourtLocations: any;
  selectedCitation: Citation;
  selectedCitationCourt: Court;

  constructor(private citationService: CitationService,
              private courtService: CourtsService,
              private router: Router) { }

  private groupCitationsByDL() {
    let dlNum = '';
    let dlState = '';
    this.groupedCitations = [];
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

  getFormattedCourtDate(dateToFormat, courtId: string) {
    const court = this.getCourtById(courtId);
    return moment.tz(dateToFormat, court.zone_id).format('MM/DD/YYYY');
  }
/*
  selectCitation(citation, idToScrollTo) {
    ctrl.selectedCitation = citation;
    Session.setSelectedCitation(ctrl.selectedCitation);

    Courts.findById(ctrl.selectedCitation.court_id).then(function (court) {
      ctrl.selectedCitation.court = court;
      ctrl.selectedCitation.courtDirectionLink = getCourtDirectionLink(ctrl.selectedCitation);
    });
    for (var municipality in municipalities) {
      if (ctrl.selectedCitation.municipality_id === municipalities[municipality].id) {
        ctrl.paymentUrl = municipalities[municipality].paymentUrl;
        break;
      }
    }
    if (citations.length > 1) {
      $anchorScroll(idToScrollTo);
    }
  };
*/
  selectCitation(citation) {
    this.selectedCitation = citation;
  }

  getCourtById(courtId: string) {
    if (this.courts.length > 0) {
      return this.courts.find(court => {
        return court.id === courtId;
      });
    } else {
      return new Court();
    }
  }

  ngOnInit() {
    this.citations = this.citationService.getCurrentCitations();
    if (this.citations.length === 0) {
      this.router.navigate(['findTickets']);
    } else {
      this.groupCitationsByDL();
      this.dataSource = new MatTableDataSource(this.groupedCitations);
      this.courtService.findAll().subscribe((courts) => {
        this.courts = courts;
        this.citationCourtLocations = {};
        for (let citationCount = 0; citationCount < this.citations.length; citationCount++) {
          const courtId = this.citations[citationCount].court_id;
          const foundCourt = this.getCourtById(courtId);
          this.citationCourtLocations[courtId] = foundCourt.name;
        }
        if (this.citations.length === 1) {
          this.selectCitation(this.citations[0]);
          this.selectedCitationCourt = this.getCourtById(this.selectedCitation.court_id);
        }
      });

    }
  }

}
