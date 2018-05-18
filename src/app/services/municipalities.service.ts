import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Municipality} from '../models/municipality';
import '../rxjs-operators';

@Injectable()
export class MunicipalitiesService {

  constructor( private http: HttpClient ) { }

  public findAll(): Observable<Municipality[]> {
    return this.findSupported(null);
  }

  public findSupported(supported): Observable<Municipality[]> {
    let options = {};
    if (!(supported === undefined || supported === null)) {
      options = { params: new HttpParams().set('supported', supported)};
    }

    return this.http
      .get(environment.baseUrl + '/municipalities', options)
      .map(response => {
        return <Array<Municipality>>response;
      });
  }

  public findById(id: any): Observable<Municipality> {
    return this.http
      .get( environment.baseUrl + '/municipalities/' + id)
      .map(response => {
        return <Municipality>response;
      });
  }

  public findByCourtId(id: any): Observable<Municipality[]> {
    return this.http
      .get( environment.baseUrl + '/courts/' + id + '/municipalities')
      .map(response => {
        return <Array<Municipality>>response;
      });
  }

}
