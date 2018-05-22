import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {SmsInfo} from '../models/smsInfo';


@Injectable()
export class SmsinfoService {

  constructor(private http: HttpClient) { }

  public getPhoneNumber(): Observable<string> {
    return this.http
      .get(environment.baseUrl + '/sms/info')
      .map(response => {
        const smsInfo: SmsInfo = <SmsInfo>response;
        return this.phoneNumberFilter(smsInfo.phoneNumber);
      });
  }

  private phoneNumberFilter(numberToFormat) {
    const baseNumber = numberToFormat.replace(/(\D)/g, '').replace(/^1/, '');
    const m = baseNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? '' : '(' + m[1] + ') ' + m[2] + '-' +m[3];
  }
}
