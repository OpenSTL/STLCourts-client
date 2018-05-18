import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNotFoundComponent } from './ticket-not-found.component';

describe('TicketNotFoundComponent', () => {
  let component: TicketNotFoundComponent;
  let fixture: ComponentFixture<TicketNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
