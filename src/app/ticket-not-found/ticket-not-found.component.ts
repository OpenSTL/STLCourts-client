import { Component, OnInit } from '@angular/core';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Municipality} from '../models/municipality';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-ticket-not-found',
  templateUrl: './ticket-not-found.component.html',
  styleUrls: ['./ticket-not-found.component.scss']
})

export class TicketNotFoundComponent implements OnInit {
  supportedMunicipalities$: Observable<Municipality[]>;

  constructor(private municipalityService: MunicipalitiesService) { }

  ngOnInit() {
    this.supportedMunicipalities$ = this.municipalityService.findSupported(true);
  }
}
