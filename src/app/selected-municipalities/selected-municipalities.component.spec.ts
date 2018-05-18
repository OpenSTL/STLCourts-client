import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMunicipalitiesComponent } from './selected-municipalities.component';

describe('SelectedMunicipalitiesComponent', () => {
  let component: SelectedMunicipalitiesComponent;
  let fixture: ComponentFixture<SelectedMunicipalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedMunicipalitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMunicipalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
