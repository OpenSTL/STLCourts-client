import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMunicipalitiesComponent } from './selected-municipalities.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('SelectedMunicipalitiesComponent', () => {
  let component: SelectedMunicipalitiesComponent;
  let fixture: ComponentFixture<SelectedMunicipalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedMunicipalitiesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMunicipalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
     expect(component).toBeTruthy();
  });
});
