import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCourtsComponent } from './find-courts.component';
import {Court} from '../models/court';
import {Municipality} from '../models/municipality';
import {Observable} from 'rxjs/Observable';
import {CourtsService} from '../services/courts.service';
import {MunicipalitiesService} from '../services/municipalities.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material';
import {RouterLinkStubDirective} from '../../testing/router-stubs';

describe('FindCourtsComponent', () => {
  let component: FindCourtsComponent;
  let fixture: ComponentFixture<FindCourtsComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const createCourt = function(id: string, name: string) {
    const court = new Court();
    court.id = id;
    court.name = name;
    return court;
  };

  const createMuni = function(id: string, name: string, courtIdArray: string[]) {
    const muni = new Municipality();
    muni.id = id;
    muni.name = name;
    muni.courts = courtIdArray;
    return muni;
  };

  const court1 = createCourt('1', 'First Court');
  const court2 = createCourt('2', 'Second Court');
  const court3 = createCourt('3', 'Third Court');
  const courts: Court[] = [court1, court2, court3];

  const muni1 = createMuni('1', 'First Muni', [court1.id]);
  const muni2 = createMuni('2', 'Second Muni', [court2.id, court3.id]);
  const munis: Municipality[] = [muni1, muni2];


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

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule],
      declarations: [ FindCourtsComponent, RouterLinkStubDirective ],
      providers: [
        { provide: MunicipalitiesService, useValue: muniServiceStub},
        { provide: CourtsService, useValue: courtsServiceStub},
        { provide: Router, useValue: routerSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it( 'should navigate correctly on court selected', () => {
    const inputde = fixture.debugElement.query(By.css('#selectCourtInput'));
    inputde.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then( () => {
      de = fixture.debugElement.query(By.css('mat-option'));
      el = de.nativeElement;
      el.click();
      fixture.detectChanges();
      expect(routerSpy.navigate).toHaveBeenCalledWith('courts/1');
    });
  });

  it( 'should populate muniSearchGroups', () => {
    expect(component.muniSearchGroups[0].municipalityName).toEqual('First Muni');
    expect(component.muniSearchGroups[1].municipalityName).toEqual('Second Muni');
    expect(component.muniSearchGroups[0].courts[0].name).toEqual('First Court');
    expect(component.muniSearchGroups[1].courts[0].name).toEqual('Second Court');
    expect(component.muniSearchGroups[1].courts[1].name).toEqual('Third Court');
  });

  it( 'should get the correct group label', () => {
    expect(component.getGroupLabel(component.muniSearchGroups[0])).toEqual('');
    expect(component.getGroupLabel(component.muniSearchGroups[1])).toEqual(component.muniSearchGroups[1].municipalityName);
  });

  it( 'should get the correct autocomplete display', () => {
    expect( component.getAutoCompleteDisplay()).toBe(undefined);
    expect( component.getAutoCompleteDisplay(court1)).toEqual('First Court');
  });

  it( ' should correctly provide the correct filtering for Autocomplete', () => {
    expect(component.filterAutoComplete('st')[0].municipalityName).toEqual(component.muniSearchGroups[0].municipalityName);
    expect(component.filterAutoComplete('bad')).toEqual([]);
  });

  it('should correctly initialize municipalities', () => {
    expect(component.municipalities.length).toBe(2);
    expect(component.municipalities[0]).toEqual(muni1);
  });

  it('should correctly initialize courts', () => {
    expect(component.courts.length).toBe(3);
    expect(component.courts[1]).toEqual(court2);
  });

});
