import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectDialogComponent } from './map-select-dialog.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Observable} from 'rxjs/Observable';
import {Municipality} from '../models/municipality';
import {Court} from '../models/court';
import {MAT_DIALOG_DATA} from '@angular/material';

describe('MapSelectDialogComponent', () => {
  let component: MapSelectDialogComponent;
  let fixture: ComponentFixture<MapSelectDialogComponent>;

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

  const muniServiceStub = {
    findAll: function() {
      return new Observable(observer => {
        observer.next(munis);
      });
    }
  };

  const dialogData: Object = {selectedMunicipalities: [muni1]};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: MunicipalitiesService, useValue: muniServiceStub},
                  {provide: MAT_DIALOG_DATA, useValue: dialogData}],
      declarations: [ MapSelectDialogComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
