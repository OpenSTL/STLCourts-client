import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityServiceComponent } from './community-service.component';

describe('CommunityServiceComponent', () => {
  let component: CommunityServiceComponent;
  let fixture: ComponentFixture<CommunityServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
