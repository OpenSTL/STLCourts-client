import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Court} from '../models/court';
import '../rxjs-operators';

@Injectable()
export class CourtsService {

  constructor( private http: HttpClient ) { }

  public findAll(): Observable<Court[]> {
    return this.http
      .get(environment.baseUrl + '/courts')
      .map(response => {
        const courts = [];
        const courtResponse = <Court[]>response;
        courtResponse.forEach((pojoCourt) => {
          const court = new Court();
          court.fromPOJO(pojoCourt);
          courts.push(court);
        });
        return courts;
      });
  }

  public findById(id: any): Observable<Court> {
    return this.http
      .get( environment.baseUrl + '/courts/' + id)
    .map(response => {
      const court = new Court();
      court.fromPOJO(<Court>response);
      return court;
      });
    }

}
