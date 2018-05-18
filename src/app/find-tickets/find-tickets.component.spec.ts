import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTicketsComponent } from './find-tickets.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatDialog} from '@angular/material';
import {State} from '../models/state';
import {UsStatesService} from '../services/us-states.service';
import {Observable} from 'rxjs/Observable';
import {Municipality} from '../models/municipality';
import {Court} from '../models/court';
import {MunicipalitiesService} from '../services/municipalities.service';
import {CitationService} from '../services/citation.service';
import {Citation} from '../models/citation';
import {Router} from '@angular/router';


describe('FindTicketsComponent', () => {
  let component: FindTicketsComponent;
  let fixture: ComponentFixture<FindTicketsComponent>;

  const createMuni = function(id: string, name: string, courtIdArray: string[]) {
    const muni = new Municipality();
    muni.id = id;
    muni.name = name;
    muni.courts = courtIdArray;
    return muni;
  };

  const createCourt = function(id: string, name: string) {
    const court = new Court();
    court.id = id;
    court.name = name;
    return court;
  };

  const court1 = createCourt('1', 'First Court');
  const court2 = createCourt('2', 'Second Court');
  const court3 = createCourt('3', 'Third Court');

  const muni1 = createMuni('1', 'First Muni', [court1.id]);
  const muni2 = createMuni('2', 'Second Muni', [court2.id, court3.id]);
  const munis: Municipality[] = [muni1, muni2];

  const matDialogStub = {
    open: function() {},
    close: function() {}
  };

  const usStatesServiceStub = {
    getStates: function() {
      return new State('Hawaii', 'HI');
    }
  };

  const muniServiceStub = {
    findAll: function() {
      return new Observable(observer => {
        observer.next(munis);
      });
    }
  };

  const citation1 = new Citation();
  const citations: Citation[] = [citation1];

  const citationServiceStub = {
    find: function() {
      return new Observable( observer => {
        observer.next(citations);
      });
    },
    setCurrentCitations: function() {}
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatAutocompleteModule  ],
      declarations: [ FindTicketsComponent ],
      providers: [{provide: MatDialog, useValue: matDialogStub},
        {provide: UsStatesService, useValue: usStatesServiceStub},
        {provide: MunicipalitiesService, useValue: muniServiceStub},
        {provide: CitationService, useValue: citationServiceStub},
        { provide: Router, useValue: routerSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
