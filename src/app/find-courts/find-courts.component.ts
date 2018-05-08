import { Component, OnInit } from '@angular/core';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Municipality} from '../models/municipality';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {Court} from '../models/court';
import {CourtsService} from '../services/courts.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-find-courts',
  templateUrl: './find-courts.component.html',
  styleUrls: ['./find-courts.component.scss']
})
export class FindCourtsComponent implements OnInit {

  municipalities: Municipality[];
  courts: Court[];
  courtSelectorPlaceholder: String = 'Find municipal court information...';
  courtCtrl: FormControl = new FormControl();
  citySearchGroups: any = [];

  constructor( private muniService: MunicipalitiesService,
               private courtService: CourtsService) { }

  onCourtSelected(event: MatAutocompleteSelectedEvent) {
    // this.court = find(this.courts, {'name': event.option.value});
  }

  groupCourts(citySearchGroup) {
    // undefined causes no group to be made
    return citySearchGroup.municipalityCourtCount > 1 ? citySearchGroup.municipalityName : undefined;
  }

  populateCitySearchGroups() {
    const groups = [];
    const self = this;
    this.municipalities.forEach(function(municipality) {
      municipality.courts.forEach(function(courtId) {
        groups.push({
          municipalityName: municipality.name,
          municipalityCourtCount: municipality.courts.length,
          court: self.courts.find(foundCourt => foundCourt.id === courtId )
        });
      });
    });

    this.citySearchGroups = groups;
  }


  ngOnInit() {
    const muniObs$ = this.muniService.findSupported(true);
    const courtObs$ = this.courtService.findAll();

    Observable.zip( muniObs$, courtObs$, (munis: Municipality[], courts: Court[]) => ({munis, courts}))
    .subscribe(result => {
      this.municipalities = result.munis;
      this.courts = result.courts;
      this.populateCitySearchGroups();
    });
  }

}
