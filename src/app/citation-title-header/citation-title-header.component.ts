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

  constructor() { }

  ngOnInit() {
  }

}
