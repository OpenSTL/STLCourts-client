import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDialogComponent } from './security-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {ObservableMedia} from '@angular/flex-layout';
import {Observable} from 'rxjs/Observable';

describe('SecurityDialogComponent', () => {
  let component: SecurityDialogComponent;
  let fixture: ComponentFixture<SecurityDialogComponent>;

  const matDialogStub = {
    close: function() {}
  };

  const observableMediaStub = new Observable( mediaSize => {
    mediaSize.next('md');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatDatepickerModule, MatDialogModule ],
      providers: [{provide: MatDialogRef, useValue: matDialogStub},
                  { provide: ObservableMedia, useValue: observableMediaStub }],
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
