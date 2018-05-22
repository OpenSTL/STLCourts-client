import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Citation} from '../models/citation';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {CourtsService} from './courts.service';
import {Court} from '../models/court';
import * as moment from 'moment-timezone';
import {Router} from '@angular/router';


@Injectable()
export class CitationService {
  courts: Court[];
  private currentCitations: Citation[] = [];

  constructor(private http: HttpClient,
              private courtsService: CourtsService,
              private router: Router) {
    this.courtsService.findAll().subscribe((courts) => {
      this.courts = courts;
    });
  }

  public find(httpParams: HttpParams): Observable<Citation[]> {
    return this.http.get(environment.baseUrl + '/citations', {params: httpParams})
      .map(response => {
        const citations = [];
        const citationResponse = <Citation[]>response;
        citationResponse.forEach((pojoCitation) => {
           this.convertCitationDateStringsToDates(pojoCitation);
           const citation = new Citation();
           citation.fromPOJO(pojoCitation);
           citations.push(citation);
        });
        return citations;
      })
      .catch((err) => {
        console.log('Citation Error Caught');
        this.router.navigate(['']);
        return Observable.throw('Citation Error');
      });
  }

  private convertCitationDateStringsToDates(citation: Citation) {
    const timeZone = this.getTimeZone(citation.court_id);

    citation.citation_date = this.getDate(citation.citation_date, timeZone);
    citation.date_of_birth = this.getDate(citation.date_of_birth, timeZone);
    citation.court_dateTime = this.getDate(citation.court_dateTime, timeZone);
  }

  private getDate(isoDateString, timeZone: string) {
    if (isoDateString) {
      return new Date(moment(isoDateString).tz(timeZone).format());
      // return new Date(isoDateString);
    } else {
      return null;
    }
  }

  private getTimeZone(courtId: string) {
    return this.courts.find((court) => {
      return court.id === courtId;
    }).zone_id;
  }

  setCurrentCitations(citations) {
    this.currentCitations = citations;
  }

  getCurrentCitations() {
    return this.currentCitations;
  }

  clearCurrentCitations() {
    this.currentCitations = [];
  }
}
