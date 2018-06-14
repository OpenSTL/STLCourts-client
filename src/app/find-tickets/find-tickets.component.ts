import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {SecurityDialogComponent} from '../security-dialog/security-dialog.component';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {State} from '../models/state';
import {UsStatesService} from '../services/us-states.service';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Municipality} from '../models/municipality';
import {Observable} from 'rxjs/Observable';
import {MapSelectDialogComponent} from '../map-select-dialog/map-select-dialog.component';
import {CitationService} from '../services/citation.service';
import {CitationParameters} from '../models/citation-parameters';
import {Router} from '@angular/router';

export enum Showing {
  All,
  Have_Ticket,
  Have_DL,
  Have_Location
}

@Component({
  selector: 'app-find-tickets',
  templateUrl: './find-tickets.component.html',
  styleUrls: ['./find-tickets.component.scss']
})

export class FindTicketsComponent implements OnInit {
  ShowingEnum = Showing;
  ticketFinderShowing: Showing;
  ticketNumCtrl: FormControl;// = new FormControl('', Validators.required);
  licenseNumCtrl: FormControl;// = new FormControl('', Validators.required);
  statesCtrl: FormControl;// = new FormControl('', [Validators.required, this.statesValidator()]);
  muniCtrl: FormControl;// = new FormControl();
  states: State[];
  municipalities: Municipality[];
  // this is a list of munis that have not been selected by the map finder
  nonSelectedMunicipalities: Municipality[];
  selectedMunicipalities: Municipality[];
  filteredStates: Observable<State[]>;
  filteredMunis: Observable<Municipality[]>;
  selectedMunicipalitesShowError = false;

  constructor(private dialog: MatDialog,
              private usStates: UsStatesService,
              private muniService: MunicipalitiesService,
              private citationService: CitationService,
              private router: Router,
              private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'Search tickets by city, ticket number or driver\'s license number. ' +
        'Pay fines, look for community service options, find legal assistance, contact the court. It\'s all here.'},
      {name: 'author', content: 'CivTechStl'},
      {name: 'keywords', content: 'st. louis ticket, traffic ticket, ' +
        'st. louis ticketfinder, st. louis ticket finder, st louis ticketfinder'}
    ]);
  }

  // Code for managing which component boxes are showing

  onTicketFinderBoxClick(ticketBoxToShow: Showing) {
    // only change which box is showing if all boxes are selectable, otherwise one is blacked out
    if (this.ticketFinderShowing === Showing.All) {
      if (ticketBoxToShow === Showing.Have_DL) {
        this.initializeStateToMissouri();
      }
      this.ticketFinderShowing = ticketBoxToShow;
    }
  }

  blackout(boxType: Showing) {
    let show = false;
    if (this.ticketFinderShowing !== Showing.All) {
      if (this.ticketFinderShowing !== boxType) {
        show = true;
      }
    }
    return show;
  }

  detailsBoxClose() {
    this.ticketFinderShowing = Showing.All;
    this.selectedMunicipalitesShowError = false;
    this.statesCtrl.reset();
    this.muniCtrl.reset();
    this.ticketNumCtrl.reset();
    this.licenseNumCtrl.reset();
    this.initializeNonSelectedMunis();
    this.selectedMunicipalities = [];
  }

  showSelectedMunicipalitesError() {
    return this.selectedMunicipalitesShowError && this.selectedMunicipalities.length === 0;
  }

  openSecurityDialog() {
    let isValid = false;
    switch (this.ticketFinderShowing) {
      case Showing.Have_Ticket:
        isValid = this.ticketNumCtrl.valid;
        this.ticketNumCtrl.markAsTouched();
        break;
      case Showing.Have_DL:
        isValid = this.licenseNumCtrl.valid && this.statesCtrl.valid;
        this.licenseNumCtrl.markAsTouched();
        this.statesCtrl.markAsTouched();
        break;
      case Showing.Have_Location:
        isValid = this.selectedMunicipalities.length > 0;
        this.selectedMunicipalitesShowError = true;
        break;
    }

    if (isValid) {
      const dialogRef = this.dialog.open(SecurityDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const citationParams = new CitationParameters(result.dob,
            result.lastName,
            this.ticketNumCtrl.value,
            this.licenseNumCtrl.value,
            this.statesCtrl.value.abbreviation,
            this.selectedMunicipalities.map((muni) => {
              return muni.id;
            })
          );

          this.citationService.find(citationParams.getHttpParams()).subscribe((citations) => {
            this.citationService.setCurrentCitations(citations);
            if (citations.length > 0) {
              this.router.navigate(['tickets/info']);
            } else {
              this.router.navigate(['tickets/error/notFound']);
            }
          });
        }
      });
    }
  }

  openMapDialog() {
    const dialogRef = this.dialog.open(MapSelectDialogComponent, {
      position: { top: '15px' },
      data: {selectedMunicipalities: this.selectedMunicipalities}
    });

    dialogRef.afterClosed().subscribe(selectedMunis => {
      if (selectedMunis) {
        selectedMunis.forEach((selectedMuni) => {
          this.removeMuniFromNonSelected(selectedMuni);
        });
      }
    });
  }


  muniRemovedFromSelected(municipality: Municipality) {
    const muniIndex = this.selectedMunicipalities.findIndex( (muni) => {
      return (municipality.name === muni.name);
    });
    this.selectedMunicipalities.splice(muniIndex, 1);
    this.addMuni(municipality);
  }

  filterStatesAutoComplete(typing: string | State): State[] {
    let typedText = '';
    if (typeof typing === 'string') {
      typedText = typing;
    } else {
      typedText = typing.fullName;
    }

    return this.states.filter(state =>
      state.fullName.toLowerCase().includes(typedText.toLowerCase()));
  }

  filterMunisAutoComplete(typing: any): Municipality[] {
    if (typeof typing === 'string') {
      return this.nonSelectedMunicipalities.filter(muni =>
        muni.name.toLowerCase().includes((typing.toLowerCase())));
    } else {
      return this.nonSelectedMunicipalities;
    }
  }
  onMuniChanged(municipalityName) {
    const muniIndex = this.nonSelectedMunicipalities.findIndex( (muni) => {
      return (municipalityName === muni.name);
    });

    if (muniIndex > -1) {
      this.validMuniSelected(muniIndex);
    }
  }

  onStateChanged(stateName) {
    const stateIndex = this.getStatesIndex(stateName);

    if (stateIndex > -1) {
      this.statesCtrl.setValue(this.states[stateIndex]);
    }
  }

  private getStatesIndex(passedState: string | State): number {
    let stateName = '';
    if (typeof passedState === 'object') {  // validator passes an object if the state is clicked is clicked.
      stateName = passedState.fullName;
    } else {
      stateName = passedState;
    }

    stateName = stateName.toLowerCase();
    const stateIndex = this.states.findIndex( (state: State) => {
      return (stateName === state.fullName.toLowerCase() || stateName === state.abbreviation.toLowerCase());
    });

    return stateIndex;
  }

  stateDisplayFn(state?: State): string | undefined {
    return state ? state.fullName : undefined;
  }

  validMuniSelected(muniIndex: number) {
    const selectedMunicipality: Municipality = this.nonSelectedMunicipalities[muniIndex];
    this.removeMuniFromNonSelected(selectedMunicipality);
  }

  muniDisplayFn(municipality?: Municipality): string | undefined {
    return municipality ? municipality.name : undefined;
  }

  private initializeNonSelectedMunis() {
    this.nonSelectedMunicipalities = this.municipalities.slice();
  }

  private addMuni(muniToAdd: Municipality) {
    this.nonSelectedMunicipalities.splice(-1, 0, muniToAdd);
    this.sortMunis();
    this.muniCtrl.reset();
  }

  private removeMuniFromNonSelected(muniToRemove: Municipality) {
    const muniIndexToRemove = this.nonSelectedMunicipalities.findIndex((muni) => {
      return (muniToRemove.id === muni.id);
    });
    this.nonSelectedMunicipalities.splice(muniIndexToRemove, 1);
    this.sortMunis();
    this.muniCtrl.reset();
    this.selectedMunicipalities.push(muniToRemove);
  }

  private sortMunis() {
    this.nonSelectedMunicipalities.sort((a: Municipality, b: Municipality) => {
      if (a.name < b.name) {
        return -1;
      } else {
        if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  private statesValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (this.getStatesIndex(control.value) !== -1) {
        return null;
      } else {
        return {'validState': 'Please enter a valid state'};
      }
    };
  }

  private initializeStateToMissouri() {
    const missouriIndex = this.getStatesIndex('Missouri');
    if (missouriIndex !== -1) {
      this.statesCtrl.setValue(this.states[missouriIndex]);
    }
  }

  ngOnInit() {
    this.ticketFinderShowing = Showing.All;
    this.states = this.usStates.getStates();
    this.selectedMunicipalities = [];

    this.ticketNumCtrl = new FormControl('', Validators.required);
    this.licenseNumCtrl = new FormControl('', Validators.required);
    this.statesCtrl = new FormControl('', [Validators.required, this.statesValidator()]);
    this.muniCtrl = new FormControl();

    this.filteredStates = this.statesCtrl.valueChanges
      .startWith(null)
      .map(typing => typing ? this.filterStatesAutoComplete(typing) : this.states.slice());

    this.filteredMunis = this.muniCtrl.valueChanges
      .startWith(null)
      .map(typing => typing ? this.filterMunisAutoComplete(typing) : this.nonSelectedMunicipalities.slice());

    this.muniService.findAll().subscribe( (munis) => {
      this.municipalities = munis;
      this.initializeNonSelectedMunis();
    });
  }
}
