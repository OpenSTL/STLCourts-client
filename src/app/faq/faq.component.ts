import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Faq} from '../models/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqGroup = [];
  backgroundColors = ['lightblue', 'lightgreen', 'lightpink', '#DDBDF1'];
  constructor(private http: HttpClient) { }

  randomColSpan(): number {
   return Math.floor((Math.random() * 4) + 1);
  }

  randomRowSpan(): number {
    return Math.floor((Math.random() * 2) + 1);
  }

  randomColor() {
    const randomIndex = Math.floor((Math.random() * 4));
    return this.backgroundColors[randomIndex];
  }

  ngOnInit() {
    this.http.get('assets/questionAnswers.json').subscribe ((jsonData) => {

      let colorClassCount = 0;
      for (const group of Object.keys(jsonData)) {
        this.faqGroup[group] = [];
          let colSpan = 0;
          jsonData[group].forEach((faqItem) => {
            const faq = new Faq(faqItem.q, faqItem.a, faqItem.keywords, faqItem.fillIn);
            let randomColSpan = this.randomColSpan();

            if (faqItem === jsonData[group][jsonData[group].length - 1]) {
              randomColSpan = 4 - colSpan;
            } else {
              if (randomColSpan + colSpan > 4) {
                randomColSpan = 4 - colSpan;
                colSpan = 0;
              } else {
                if (randomColSpan + colSpan === 4) {
                  colSpan = 0;
                } else {
                  colSpan += randomColSpan;
                }
              }
            }
            faq.colSpan = randomColSpan;
            faq.rowSpan = 1; // this.randomRowSpan();
           // faq.itemColor = this.randomColor();
            let colorClassName = '';
            switch (colorClassCount % 3) {
              case 0:
                colorClassName = 'colorClass1';
                break;
              case 1:
                colorClassName = 'colorClass2';
                break;
              case 2:
                colorClassName = 'colorClass3';
                break;
            }
            faq.colorClass = colorClassName;
            this.faqGroup[group].push(faq);
            colorClassCount++;
          });
        }
    });
  }

}
