import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCourtsComponent } from './find-courts.component';
import {Court} from '../models/court';
import {Municipality} from '../models/municipality';
import {Observable} from 'rxjs/Observable';
import {CourtsService} from '../services/courts.service';
import {MunicipalitiesService} from '../services/municipalities.service';

describe('FindCourtsComponent', () => {
  let component: FindCourtsComponent;
  let fixture: ComponentFixture<FindCourtsComponent>;

  const createCourt = function(id: number, name: string) {
    const court = new Court();
    court.id = id;
    court.name = name;
    return court;
  };

  const createMuni = function(id: number, name: string) {
    const muni = new Municipality();
    muni.id = id;
    muni.name = name;
    return muni;
  };

  const court1 = createCourt(1, 'First Court');
  const court2 = createCourt(2, 'Second Court');
  let courts: Court[];

  const muni1 = createMuni(1, 'First Muni');
  const muni2 = createMuni(2, 'Second Muni');
  let munis: Municipality[];


  const muniServiceStub = {
    findAll: function() {
      return new Observable(observer => {
        observer.next(munis);
      });
    },
    findSupported: function(supported: boolean) {
      return new Observable( observer => {
        observer.next(munis);
      });
    }
  };

  const courtsServiceStub = {
    findAll: function () {
      return new Observable(observer => {
        observer.next(courts);
      });
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCourtsComponent ],
      providers: [
        { provide: MunicipalitiesService, useValue: muniServiceStub},
        { provide: CourtsService, useValue: courtsServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
