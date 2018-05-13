import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent implements OnInit {

  courtId = '';

  constructor( private route: ActivatedRoute,
               private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'Your StlCourts Court Information'},
      {name: 'author', content: 'CivTechStl'},
      {name: 'keywords', content: 'st. louis courts, st louis courts, court, municipal court'}
    ]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.courtId = paramMap.get('courtId');
    });
  }

}
