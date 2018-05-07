import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Municipality} from '../models/municipality';
import '../rxjs-operators';

@Injectable()
export class MunicipalitiesService {

  constructor( private http: HttpClient ) { }

  public findAll(): Observable<Municipality[]> {
    return this.http
      .get(environment.baseUrl + '/municipalities')
      .map(response => {
        return <Array<Municipality>>response;
      });
  }

  findSupported(supported): Observable<Municipality[]> {
    const params = {};
    if (supported !== undefined) {
      params.supported = supported;
    }
    return Municipalities.query(params).$promise;
  }


}
