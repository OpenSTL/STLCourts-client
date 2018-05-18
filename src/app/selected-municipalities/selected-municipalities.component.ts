import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Municipality} from '../models/municipality';
import {Constants} from '../models/constants';

@Component({
  selector: 'app-selected-municipalities',
  templateUrl: './selected-municipalities.component.html',
  styleUrls: ['./selected-municipalities.component.scss']
})
export class SelectedMunicipalitiesComponent implements OnInit {
  @Input() municipalities: Municipality[];
  @Output() removedMuni = new EventEmitter<any>();

  maxSelectedMunicipalities: number;

  constructor() { }

  remove(municipality: Municipality): void {
    this.removedMuni.emit(municipality);
  }

  showWarningMessage() {
    return this.municipalities.length > this.maxSelectedMunicipalities;
  }

  ngOnInit() {
    this.maxSelectedMunicipalities = Constants.MAX_SELECTED_MUNICIPALITIES;
  }

}
