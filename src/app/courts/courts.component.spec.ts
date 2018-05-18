import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsComponent } from './courts.component';
import {ActivatedRoute, Router} from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Court} from '../models/court';
import {CourtsService} from '../services/courts.service';
import {LegalRightsService} from '../services/legal-rights.service';
import {By} from '@angular/platform-browser';


describe('CourtsComponent', () => {
  let component: CourtsComponent;
  let fixture: ComponentFixture<CourtsComponent>;
  let mockActivatedRoute;
  let paramMapMock;

  const createCourt = function(id: string, name: string, address?: string, city?: string, state?: string, zip?: string) {
    const court = new Court();
    court.id = id;
    court.name = name;
    court.address = address;
    court.city = city;
    court.state = state;
    court.zip = zip;
    return court;
  };

  const court1 = createCourt('1', 'First Court', '12500 Old Jamestown Road', 'St. Louis', 'MO', '63033');
  const court2 = createCourt('2', 'Second Court');
  const court3 = createCourt('3', 'Third Court');
  const courts: Court[] = [court1, court2, court3];

  const courtsServiceStub = {
    findAll: function () {
      return new Observable(observer => {
        observer.next(courts);
      });
    }
  };

  const legalRightsServiceStub = {
    legalRightsLink: function() {
      return 'abc';
    }
  };

  class ParamMapMock {
    valueToReturn = '';

    public set(valueToSet: string) {
      this.valueToReturn = valueToSet;
    }

    public get() {
      return this.valueToReturn;
    }
  }

  class ActivatedRouteMockClass {
    paramMap = new Observable( observer => {
      observer.next(paramMapMock);
    });
  }

  const mockMap = {
    dragging: {
      disable: function() {}
    }
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    paramMapMock = new ParamMapMock();
    mockActivatedRoute = new ActivatedRouteMockClass();

    TestBed.configureTestingModule({
      declarations: [ CourtsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CourtsService, useValue: courtsServiceStub },
        { provide: LegalRightsService, useValue: legalRightsServiceStub },
        { provide: Router, useValue: routerSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtsComponent);
    component = fixture.componentInstance;
    paramMapMock.set('1');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set courtId', () => {
    expect(component.courtId).toBe('1');
  });

  it('should correctly set courts', () => {
    expect(component.courts.length).toBe(3);
    expect(component.courts[1].name).toEqual('Second Court');
  });

  it( 'should go to home page if no court found', () => {
    paramMapMock.set('5');
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should correctly load court', () => {
    expect(component.court.name).toEqual('First Court');
  });

  it('should disable dragging on map', () => {
    spyOn(mockMap.dragging, 'disable');
    component.onMapReady(mockMap);
    expect(mockMap.dragging.disable).toHaveBeenCalled();
  });

  it( 'should print', () => {
    spyOn(window, 'print');
    const printButtonDE = fixture.debugElement.query(By.css('#printButtonDiv button'));
    printButtonDE.triggerEventHandler('click', null);
    expect(window.print).toHaveBeenCalled();
  });

  it( 'should set directions correctly', () => {
    spyOn(window, 'open');
    const directionString = 'https://maps.google.com?saddr=Current+Location&daddr=12500+Old Jamestown Road+St. Louis+MO+63033';
    const directionsButtonDE = fixture.debugElement.query(By.css('#directionsButton'));
    directionsButtonDE.triggerEventHandler('click', null);
    expect(window.open).toHaveBeenCalledWith(directionString, '_blank');
  });

  it( 'should get legalRightslink', () => {
    const legalRightsDE = fixture.debugElement.query(By.css('#legalRightsLink'));
    legalRightsDE.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(legalRightsDE.nativeElement.href).toContain('abc');
  });

});
