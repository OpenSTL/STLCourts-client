import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAnswerDialogComponent } from './faq-answer-dialog.component';

describe('FaqAnswerDialogComponent', () => {
  let component: FaqAnswerDialogComponent;
  let fixture: ComponentFixture<FaqAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqAnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
