import { Component, OnInit } from '@angular/core';
import {CitationService} from '../services/citation.service';
import {Router} from '@angular/router';
import {Citation} from '../models/citation';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  PLACEHOLDER_DL_NUM = 'NO_DL_NUM';
  citations: Citation[];
  groupedCitations: any;

  constructor(private citationService: CitationService,
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
      if (!indexArray[dlNum + dlState]) {
        indexArray[dlNum + dlState] = index++;
        this.groupedCitations.push([]);
      }
        const foundIndex = indexArray[dlNum + dlState];
        this.groupedCitations[foundIndex].push(citation);
    });
  }

  private groupCitationsByDL2() {
    let dlNum = '';
    let dlState = '';
    const citationGroupings = {};
    // this.groupedCitations = {};

    this.citations.forEach((citation) => {
      dlNum = citation.drivers_license_number;
      dlState = citation.drivers_license_state;
      if (!dlNum) {
        // in the event the defendant does not have a DL Num assign one so the object has a key
        dlNum = this.PLACEHOLDER_DL_NUM;
      }
      if (!citationGroupings[dlNum + dlState]) {
        citationGroupings[dlNum + dlState] = [];
      }
      citationGroupings[dlNum + dlState].push(citation);
    });

    // this.createGroupedCitations(citationGroupings);
  }

  private createGroupedCitations(citationGroupings) {
    this.groupedCitations = [];
    // html ngFor will not loop through associative arrays
    citationGroupings.forEach( (citationGroup) => {
      this.groupedCitations.push(citationGroup);
    });
  }


  ngOnInit() {
    this.citations = this.citationService.getCurrentCitations();
    if (this.citations.length === 0) {
      this.router.navigate(['findTickets']);
    } else {
      this.groupCitationsByDL();
    }
    const a = 5;
  }

}
