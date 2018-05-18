import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationTitleHeaderComponent } from './citation-title-header.component';

describe('CitationTitleHeaderComponent', () => {
  let component: CitationTitleHeaderComponent;
  let fixture: ComponentFixture<CitationTitleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationTitleHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationTitleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
