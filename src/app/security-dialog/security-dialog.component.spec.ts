import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDialogComponent } from './security-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material';

describe('SecurityDialogComponent', () => {
  let component: SecurityDialogComponent;
  let fixture: ComponentFixture<SecurityDialogComponent>;

  const matDialogStub = {
    close: function() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatDatepickerModule, MatDialogModule ],
      providers: [{provide: MatDialogRef, useValue: matDialogStub}],
      declarations: [ SecurityDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
