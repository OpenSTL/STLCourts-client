import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCourtsComponent } from './find-courts.component';

describe('FindCourtsComponent', () => {
  let component: FindCourtsComponent;
  let fixture: ComponentFixture<FindCourtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCourtsComponent ]
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
