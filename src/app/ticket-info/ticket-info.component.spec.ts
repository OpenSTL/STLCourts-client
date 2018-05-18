import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInfoComponent } from './ticket-info.component';

describe('TicketInfoComponent', () => {
  let component: TicketInfoComponent;
  let fixture: ComponentFixture<TicketInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
