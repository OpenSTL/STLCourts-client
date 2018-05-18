import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTicketsComponent } from './find-tickets.component';

describe('FindTicketsComponent', () => {
  let component: FindTicketsComponent;
  let fixture: ComponentFixture<FindTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTicketsComponent ]
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
