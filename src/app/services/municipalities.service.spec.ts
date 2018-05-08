import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { MunicipalitiesService } from './municipalities.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {Municipality} from '../models/municipality';

describe('MunicipalitiesService', () => {
  let injector;
  let service: MunicipalitiesService;
  let httpMock: HttpTestingController;

  const m1: Municipality = new Municipality();
  m1.id = '1';
  m1.name = 'muni1';
  const m2: Municipality = new Municipality();
  m2.id = '2';
  m2.name = 'muni2';
  const dummyMuniData = [m1, m2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MunicipalitiesService]
    });

    injector = getTestBed();
    service = injector.get(MunicipalitiesService);
    httpMock = injector.get(HttpTestingController);

  });

  it('should be created',  () => {
    expect(service).toBeTruthy();
  });

  it('should findById', () => {
    service.findById(2).subscribe(municipality => {
      expect(municipality.name).toEqual('muni2');
    });

    const req = httpMock.expectOne(environment.baseUrl + '/municipalities/2');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMuniData[1]);
  });

  it( 'should findByCourtId', () => {
    service.findByCourtId(1).subscribe(municipalities => {
      expect(municipalities.length).toBe(2);
      expect(municipalities[0].name).toEqual('muni1');
    });

    const req = httpMock.expectOne(environment.baseUrl + '/courts/1/municipalities');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMuniData);
  });

  it('should find all', () => {
    service.findAll().subscribe(municipalities => {
      expect(municipalities.length).toBe(2);
      expect(municipalities[0].name).toEqual('muni1');
    });

    const req = httpMock.expectOne(environment.baseUrl + '/municipalities');
    // expect(req.request.params).toBe(undefined);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMuniData);
  });

  it('should find all supported', () => {
    service.findSupported(true).subscribe(municipalities => {
      expect(municipalities.length).toBe(2);
      expect(municipalities[0].name).toEqual('muni1');
    });

    const req = httpMock.expectOne(environment.baseUrl + '/municipalities?supported=true');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMuniData);
  });

  it('should find all not supported', () => {
    service.findSupported(false).subscribe(municipalities => {
      expect(municipalities.length).toBe(2);
      expect(municipalities[0].name).toEqual('muni1');
    });

    const req = httpMock.expectOne(environment.baseUrl + '/municipalities?supported=false');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMuniData);
  });
});
