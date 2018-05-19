import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-citation-title-header',
  templateUrl: './citation-title-header.component.html',
  styleUrls: ['./citation-title-header.component.scss']
})
export class CitationTitleHeaderComponent implements OnInit {
  @Input() headerText: string;
  @Input() subText: string;
  @Input() subSubText: string;
  @Input() useBackground?: boolean;

  constructor() { }

  ngOnInit() {
    this.useBackground = this.useBackground ? this.useBackground : false;
  }

}
