import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'Your StlCourts Home Page'},
      {name: 'author', content: 'CivTechStl'},
      {name: 'keywords', content: 'st. louis courts, st louis courts, court, municipal court, ' +
        'st. louis ticket, traffic ticket, st. louis county, missouri'}
    ]);
  }

}
