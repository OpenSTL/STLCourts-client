import { Component, OnInit } from '@angular/core';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Municipality} from '../models/municipality';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {Court} from '../models/court';
import {CourtsService} from '../services/courts.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-find-courts',
  templateUrl: './find-courts.component.html',
  styleUrls: ['./find-courts.component.scss']
})
export class FindCourtsComponent implements OnInit {

  municipalities: Municipality[];
  courts: Court[];
  filteredMuniGroups: Observable<any[]>;
  muniGroupCtrl: FormControl = new FormControl();
  muniSearchGroups: any = [];

  constructor( private muniService: MunicipalitiesService,
               private courtService: CourtsService,
               private router: Router) { }

  onCourtSelected(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['courts/' + event.option.value.id]);
  }

  populateMuniSearchGroups() {
    const groups = [];
    const self = this;
    this.municipalities.forEach(function(municipality) {
      const courts = [];
      municipality.courts.forEach(function(courtId) {
        courts.push(self.courts.find(foundCourt => foundCourt.id === courtId ));
      });
      groups.push({
        municipalityName: municipality.name,
        municipalityCourtCount: municipality.courts.length,
        courts: courts
      });
    });
    this.muniSearchGroups = groups;
    this.assignFilteredMuniGroups();
  }

  getGroupLabel(muniGroup) {
    if (muniGroup.municipalityCourtCount > 1) {
      return muniGroup.municipalityName;
    } else {
      return '';
    }
  }

  getAutoCompleteDisplay(court?: Court): string | undefined {
    return court ? court.name : undefined;
  }

  assignFilteredMuniGroups() {
    this.filteredMuniGroups = this.muniGroupCtrl.valueChanges
      .startWith(null)
      .map(muniGroup => muniGroup ? this.filterAutoComplete(muniGroup) : this.muniSearchGroups.slice());
  }

  filterAutoComplete(typing: any) {
    if (typeof typing === 'string') {
      return this.muniSearchGroups.filter(muniGroup => {
        if (muniGroup.municipalityName.toLowerCase().indexOf(typing.toLowerCase()) >= 0 ||
          muniGroup.courts.find(court => court.name.toLowerCase().indexOf(typing.toLowerCase()) >= 0)) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return true;
    }
  }

  ngOnInit() {
    const muniObs$ = this.muniService.findAll();
    const courtObs$ = this.courtService.findAll();

    Observable.zip( muniObs$, courtObs$, (munis: Municipality[], courts: Court[]) => ({munis, courts}))
    .subscribe(result => {
      this.municipalities = result.munis;
      this.courts = result.courts;
      this.populateMuniSearchGroups();
    });
  }

}
