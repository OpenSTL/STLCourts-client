import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtTitleHeaderComponent } from './court-title-header.component';
import {By} from '@angular/platform-browser';

describe('CourtTitleHeaderComponent', () => {
  let component: CourtTitleHeaderComponent;
  let fixture: ComponentFixture<CourtTitleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtTitleHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtTitleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'should set title correctly', () => {
    component.headerText = 'myTitle';
    fixture.detectChanges();
    const titleText = fixture.debugElement.query(By.css('span')).nativeElement.innerText;
    expect( titleText ).toEqual('myTitle');
  });
});
