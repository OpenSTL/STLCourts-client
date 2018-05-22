import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInfoComponent } from './ticket-info.component';
import {Router} from '@angular/router';
import {Citation} from '../models/citation';
import {CitationService} from '../services/citation.service';
import {Observable} from 'rxjs/Observable';

describe('TicketInfoComponent', () => {
  let component: TicketInfoComponent;
  let fixture: ComponentFixture<TicketInfoComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const citation1 = new Citation();
  const citations: Citation[] = [citation1];

  const citationServiceStub = {
    getCurrentCitations: function() {
      return citations;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInfoComponent ],
      providers: [{provide: CitationService, useValue: citationServiceStub},
                  { provide: Router, useValue: routerSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
