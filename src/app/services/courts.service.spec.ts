import {TestBed, inject, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { environment} from '../../environments/environment';
import { CourtsService } from './courts.service';

describe('CourtsService', () => {
  let injector;
  let service: CourtsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourtsService]
    });

    injector = getTestBed();
    service = injector.get(CourtsService);
    httpMock = injector.get(HttpTestingController);

  });

  it('should be created', inject([CourtsService], () => {
    expect(service).toBeTruthy();
  }));

  it('should find all', () => {
    const dummyCourtData = [
      { id: '1', name: 'One Court'},
      { id: '2', name: 'Two Court'}
    ];

    service.findAll().subscribe(courts => {
      expect(courts.length).toBe(2);
      expect(courts[0].name).toEqual('One Court');
    });

    const req = httpMock.expectOne(environment.baseUrl + '/courts');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourtData);
  });

  it('should findById', () => {
    const dummyCourtData = [
      { id: '1', name: 'One Court'},
      { id: '2', name: 'Two Court'}
    ];

    service.findById('2').subscribe(court => {
      expect(court.name).toEqual('Two Court');
    });

    const req = httpMock.expectOne(environment.baseUrl + '/courts/2');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourtData[1]);
  });

});
