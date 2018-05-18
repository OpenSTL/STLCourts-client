import { TestBed, inject } from '@angular/core/testing';

import { CitationService } from './citation.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {CourtsService} from './courts.service';
import {Observable} from 'rxjs/Observable';
import {Municipality} from '../models/municipality';
import {Court} from '../models/court';

describe('CitationService', () => {

  const createCourt = function(id: string, name: string) {
    const court = new Court();
    court.id = id;
    court.name = name;
    return court;
  };

  const court1 = createCourt('1', 'First Court');
  const court2 = createCourt('2', 'Second Court');
  const court3 = createCourt('3', 'Third Court');
  const courts: Court[] = [court1, court2, court3];

  const courtsServiceStub = {
    findAll: function () {
      return new Observable(observer => {
        observer.next(courts);
      });
    }
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitationService,
        { provide: CourtsService, useValue: courtsServiceStub},
        { provide: Router, useValue: routerSpy}]
    });
  });

  it('should be created', inject([CitationService], (service: CitationService) => {
    expect(service).toBeTruthy();
  }));
});
