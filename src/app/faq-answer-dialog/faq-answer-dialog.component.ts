import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Faq} from '../models/faq';

@Component({
  selector: 'app-faq-answer-dialog',
  templateUrl: './faq-answer-dialog.component.html',
  styleUrls: ['./faq-answer-dialog.component.scss']
})
export class FaqAnswerDialogComponent implements OnInit {

  faqItem: Faq;
  constructor(public dialogRef: MatDialogRef<FaqAnswerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Faq) { }

  ngOnInit() {
    if (this.data) {
      this.faqItem = this.data;
    }
  }

}
