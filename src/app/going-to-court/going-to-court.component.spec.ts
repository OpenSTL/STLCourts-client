import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoingToCourtComponent } from './going-to-court.component';

describe('GoingToCourtComponent', () => {
  let component: GoingToCourtComponent;
  let fixture: ComponentFixture<GoingToCourtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoingToCourtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoingToCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
