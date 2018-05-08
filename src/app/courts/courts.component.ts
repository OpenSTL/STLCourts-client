import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent implements OnInit {

  courtId = '';

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.courtId = paramMap.get('courtId');
    });
  }

}
