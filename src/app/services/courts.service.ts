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
        return <Array<Court>>response;
      });
  }

  public findById(id: any): Observable<Court> {
    return this.http
      .get( environment.baseUrl + '/courts/' + id)
    .map(response => {
        return <Court>response;
      });
    }

}
