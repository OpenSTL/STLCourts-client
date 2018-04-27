import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutletStubComponent } from '../testing/router-stubs';
import { Title } from '@angular/platform-browser';

describe('AppComponent', () => {
  let titleService: Title;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, RouterOutletStubComponent
      ],
      providers: [Title],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    titleService = TestBed.get(Title);
    app.ngOnInit();
    fixture.detectChanges();
    expect(titleService.getTitle()).toEqual('Your Stl Courts');
  }));
});
