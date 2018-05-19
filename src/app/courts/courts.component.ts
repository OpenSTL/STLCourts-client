import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {CourtsService} from '../services/courts.service';
import {Court} from '../models/court';
import {Observable} from 'rxjs/Observable';
import {icon, latLng, marker, tileLayer} from 'leaflet';
import {LegalRightsService} from '../services/legal-rights.service';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent implements OnInit {

  courtId = '';
  courts: Court[];
  court: Court;
  optionsForMap: object = null;
  layersForMap: object = null;

  constructor( private route: ActivatedRoute,
               private courtService: CourtsService,
               private legalRightsService: LegalRightsService,
               private router: Router,
               private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'Your StlCourts Court Information'},
      {name: 'author', content: 'CivTechStl'},
      {name: 'keywords', content: 'st. louis courts, st louis courts, court, municipal court'}
    ]);
  }

  private loadCourt() {
      this.court = this.courts.find( court => this.courtId === court.id );
      if ( this.court === undefined ) {
        this.router.navigate(['']);
      } else {
        this.optionsForMap = {
          layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
          ],
          zoom: 14,
          center: latLng(this.court.latitude, this.court.longitude)
        };
        this.layersForMap = [
          marker([ this.court.latitude, this.court.longitude ],
            {
              icon: icon({
                iconSize: [ 25, 41 ],
                iconAnchor: [ 12, 41 ],
                iconUrl: 'assets/images/marker-icon.png',
                shadowUrl: 'assets/images/marker-shadow.png'
              })})
          ];
      }
  }

  onMapReady(map: any) {
    map.dragging.disable();
  }

  print() {
    window.print();
  }

  private getDirectionLink() {
    const address = this.court.address.replace(' ', '+');
    const city = this.court.city;
    const state = this.court.state;
    const zip = this.court.zip;
    const addressParts = [address, city, state, zip];
    return 'https://maps.google.com?saddr=Current+Location&daddr=' + addressParts.join('+');
  }

  directions() {
    const directionLink = this.getDirectionLink();
    window.open(directionLink, '_blank');
  }

  getLegalRightsLink() {
    return this.legalRightsService.legalRightsLink(this.court);
  }

  ngOnInit() {
    const courtObs$ = this.courtService.findAll();
    const paramMap$ = this.route.paramMap;

    Observable.zip( paramMap$, courtObs$, (paramMap: ParamMap, courts: Court[]) => ({paramMap, courts}))
      .subscribe(result => {
        this.courtId = result.paramMap.get('courtId');
        this.courts = result.courts;
        this.loadCourt();
      });
  }

}
