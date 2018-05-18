import { Component, OnInit } from '@angular/core';
import {CitationService} from '../services/citation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {

  constructor(private citationService: CitationService,
              private router: Router) { }

  ngOnInit() {
    if (this.citationService.getCurrentCitations().length === 0) {
      this.router.navigate(['findTickets']);
    }
  }

}
