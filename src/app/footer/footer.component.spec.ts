import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {ContactService} from '../services/contact.service';
import {RouterLinkStubDirective} from '../../testing/router-stubs';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let linkDes: DebugElement[];
  let links: any;

  const contactServiceStub = {
    email: 'ContactMe'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent, RouterLinkStubDirective ],
      providers: [{provide: ContactService, useValue: contactServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to correct links', () => {
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(del => del.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    let linkDe = linkDes[0];
    let link = links[0];
    linkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('');

    linkDe = linkDes[1];
    link = links[1];
    linkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/about');

    linkDe = linkDes[2];
    link = links[2];
    linkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/legal');

    linkDe = linkDes[3];
    link = links[3];
    linkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/privacy');
  });

  it('should containt the correct mailTo address', () => {
    const aLinks = fixture.debugElement.queryAll(By.css('a'));
    expect(aLinks.length).toBe(5);
    expect(aLinks[4].nativeElement.href).toBe('mailto:ContactMe');
  });

  it('should return the correct copyright text', () => {
    const today = new Date();
    const todayYear = today.getFullYear().toString();
    const expected = '©2016-' + todayYear + ' CivTech St. Louis';
    const copyrightDiv = fixture.debugElement.query(By.css('#copyright')).nativeElement;
    expect(copyrightDiv.innerHTML).toEqual(expected);
  });
});
