import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {MatIconModule, MatMenuModule} from '@angular/material';
import {RouterLinkStubDirective} from '../../testing/router-stubs';
import {By} from '@angular/platform-browser';

declare var viewport: any;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatMenuModule, MatIconModule ],
      declarations: [ HeaderComponent, RouterLinkStubDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'should go to home page when logo is clicked', () => {
    const linkDes = fixture.debugElement.queryAll(By.css('#logo'));
    const links = linkDes.map(del => del.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const logoLinkDe = linkDes[0];
    const logoLink = links[0];

    logoLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(logoLink.navigatedTo).toBe('/');
  });

  viewport.from('screen', name => {
    it('should have dtNavMenu link to correct urls', () => {
      const linkDes = fixture.debugElement.queryAll(By.css('#dtMenu a'));
      const links = linkDes.map(del => del.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

      expect(linkDes.length).toBe(6);

      let linkDe = linkDes[0];
      let link = links[0];
      linkDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(link.navigatedTo).toBe('');

      linkDe = linkDes[1];
      link = links[1];
      linkDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(link.navigatedTo).toBe('/findCourts');

      linkDe = linkDes[2];
      link = links[2];
      linkDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(link.navigatedTo).toBe('/findTickets');

      linkDe = linkDes[3];
      link = links[3];
      linkDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(link.navigatedTo).toBe('/goingToCourt');

      linkDe = linkDes[4];
      link = links[4];
      linkDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(link.navigatedTo).toBe('/communityService');

      linkDe = linkDes[5];
      link = links[5];
      linkDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(link.navigatedTo).toBe('/help');
    });
  });


  viewport.to('mobile', name => {
    it('should have mobileNavMenu link to correct urls', () => {
      const menuButton = fixture.debugElement.query(By.css('#mobileMenu button')).nativeElement;
      menuButton.click();
      fixture.detectChanges();

      fixture.whenStable().then( () => {
        const linkDes = fixture.debugElement.queryAll(By.css('button'));
        const links = linkDes.map(del => del.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

        expect(linkDes.length).toBe(6);

        let linkDe = linkDes[0];
        let link = links[0];
        linkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('');

        linkDe = linkDes[1];
        link = links[1];
        linkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/findCourts');

        linkDe = linkDes[2];
        link = links[2];
        linkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/findTickets');

        linkDe = linkDes[3];
        link = links[3];
        linkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/goingToCourt');

        linkDe = linkDes[4];
        link = links[4];
        linkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/communityService');

        linkDe = linkDes[5];
        link = links[5];
        linkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/help');
      });
    });
  });
});
