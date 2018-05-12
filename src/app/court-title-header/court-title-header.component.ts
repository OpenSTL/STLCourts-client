import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-court-title-header',
  templateUrl: './court-title-header.component.html',
  styleUrls: ['./court-title-header.component.scss']
})
export class CourtTitleHeaderComponent implements OnInit {
  @Input() headerText: string;

  constructor() { }

  ngOnInit() {
  }

}
