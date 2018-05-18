import { TestBed, inject } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('SnackBarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SnackBarService]
    });
  });

  it('should be created', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
