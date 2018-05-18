import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectDialogComponent } from './map-select-dialog.component';

describe('MapSelectDialogComponent', () => {
  let component: MapSelectDialogComponent;
  let fixture: ComponentFixture<MapSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
