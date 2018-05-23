import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTicketLookupComponent } from './sms-ticket-lookup.component';

describe('SmsTicketLookupComponent', () => {
  let component: SmsTicketLookupComponent;
  let fixture: ComponentFixture<SmsTicketLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTicketLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTicketLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
