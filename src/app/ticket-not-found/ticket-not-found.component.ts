import { Component } from '@angular/core';
import {MunicipalitiesService} from '../services/municipalities.service';

@Component({
  selector: 'app-ticket-not-found',
  templateUrl: './ticket-not-found.component.html',
  styleUrls: ['./ticket-not-found.component.scss']
})

export class TicketNotFoundComponent {
  supportedMunicipalities$ = this.municipalityService.findSupported(true);

  constructor(private municipalityService: MunicipalitiesService) { }

}
