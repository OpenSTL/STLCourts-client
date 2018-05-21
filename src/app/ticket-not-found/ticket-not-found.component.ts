import { Component, OnInit } from '@angular/core';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Municipality} from '../models/municipality';

@Component({
  selector: 'app-ticket-not-found',
  templateUrl: './ticket-not-found.component.html',
  styleUrls: ['./ticket-not-found.component.scss']
})
export class TicketNotFoundComponent implements OnInit {

  supportedMunicipalities: Municipality[] = [];

  constructor(private municipalityService: MunicipalitiesService) { }

  ngOnInit() {
    this.municipalityService.findSupported(true).subscribe((supportedMunis) => {
      this.supportedMunicipalities = supportedMunis;
    });
  }
}
