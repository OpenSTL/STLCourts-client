import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Faq} from '../models/faq';
import {MatDialog} from '@angular/material';
import {FaqAnswerDialogComponent} from '../faq-answer-dialog/faq-answer-dialog.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqGroup = [];
  constructor(private http: HttpClient,
              public dialog: MatDialog) { }

  onFaqClick(faqItem: Faq) {
    this.dialog.open(FaqAnswerDialogComponent, {
     // width: '250px',
      data: faqItem
    });
  }

  ngOnInit() {
    this.http.get('assets/questionAnswers.json').subscribe ((jsonData) => {

      for (const group of Object.keys(jsonData)) {
        this.faqGroup[group] = [];
          jsonData[group].forEach((faqItem) => {
            const faq = new Faq(faqItem.q, faqItem.a, faqItem.keywords, faqItem.fillIn);
            this.faqGroup[group].push(faq);
          });
        }
    });
  }

}
