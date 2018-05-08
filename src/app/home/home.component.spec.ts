import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material';
import { HomeComponent } from './home.component';
import {RouterLinkStubDirective} from '../../testing/router-stubs';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let linkDes: DebugElement[];
  let links: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatIconModule ],
      declarations: [ HomeComponent, RouterLinkStubDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to court lookup page', () => {
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(del => del.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const courtLinkDe = linkDes[0];
    const courtLink = links[0];

    courtLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(courtLink.navigatedTo).toBe('/findCourts');

  });

  it('navigates to ticket find options page', () => {
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(del => del.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const ticketLinkDe = linkDes[1];
    const ticketLink = links[1];

    ticketLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(ticketLink.navigatedTo).toBe('/findTickets');

  });
});
