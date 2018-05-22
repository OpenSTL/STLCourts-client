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

  randomColSpan(): number{
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

      let colSpan = 0;
      for (const group of Object.keys(jsonData)) {
        this.faqGroup[group] = [];
        jsonData[group].forEach((faqItem) => {
          const faq = new Faq(faqItem.q, faqItem.a, faqItem.keywords, faqItem.fillIn);
          let randomColSpan = this.randomColSpan();
          console.log('total colSpan: ' + colSpan + randomColSpan + ', colSpan: ' + colSpan + ', randomCSpan: ' + randomColSpan);
          if ((colSpan + randomColSpan) > 4) {
            randomColSpan = 4 - colSpan;
            console.log('prev Total: ' + colSpan + ', new random: ' + randomColSpan);
            colSpan = 0;
          } else {
            if (colSpan + randomColSpan === 4) {
              colSpan = 0;
            } else {
              if (faqItem === jsonData[group.length - 1]) {
                colSpan = 4 - colSpan;
              } else {
                colSpan = colSpan + randomColSpan;
              }
            }
          }
          faq.colSpan = randomColSpan;
          faq.rowSpan = 1; // this.randomRowSpan();
          faq.itemColor = this.randomColor();
          this.faqGroup[group].push(faq);
        });
      }
    });
  }

}
