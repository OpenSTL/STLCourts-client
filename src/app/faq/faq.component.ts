import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Faq} from '../models/faq';
import {MatDialog} from '@angular/material';
import {FaqAnswerDialogComponent} from '../faq-answer-dialog/faq-answer-dialog.component';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Court} from '../models/court';
import {ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Municipality} from '../models/municipality';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqGroup = [];
  supportedMunicipalities = [];

  constructor(private municipalitiesService: MunicipalitiesService,
              private http: HttpClient,
              public dialog: MatDialog) { }

  onFaqClick(faqItem: Faq) {
    this.dialog.open(FaqAnswerDialogComponent, {
     // width: '250px',
      data: faqItem
    });
  }

  private addFillIn(faqItem: Faq) {
    switch (faqItem.fillIn) {
      case 'supportedMunicipalities':
        let supportedMuniList = 'Participating municipalities: ';
        supportedMuniList += this.supportedMunicipalities
                                    .map((muni) =>  muni.name )
                                    .join(', ');

        faqItem.a += '<p>' + supportedMuniList + '</p>';
        break;
    }
  }

  ngOnInit() {
    const muniObs$ = this.municipalitiesService.findSupported(true);
    const faqData$ = this.http.get('assets/questionAnswers.json');

    Observable.zip( faqData$, muniObs$, (faqData: any, munis: Municipality[]) => ({faqData, munis}))
      .subscribe(result => {
        this.supportedMunicipalities = result.munis;
        const jsonData = result.faqData;
        for (const group of Object.keys(jsonData)) {
          this.faqGroup[group] = [];
          jsonData[group].forEach((faqItem) => {
            this.addFillIn(faqItem);
            const faq = new Faq(faqItem.q, faqItem.a, faqItem.keywords, faqItem.fillIn);
            this.faqGroup[group].push(faq);
          });
        }
      });
  }
}
