import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsComponent } from './courts.component';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../testing/router-stubs';


describe('CourtsComponent', () => {
  let component: CourtsComponent;
  let fixture: ComponentFixture<CourtsComponent>;
  let mockActivatedRoute;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ CourtsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtsComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.setParamMap({courtId: 'abc'});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should correctly set courtId', () => {
  expect(component.courtId).toBe('abc');
  });
});
