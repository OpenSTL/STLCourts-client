import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {Browser, geoJSON, latLng, tileLayer} from 'leaflet';
import {HttpClient} from '@angular/common/http';
import {Municipality} from '../models/municipality';
import {MunicipalitiesService} from '../services/municipalities.service';
import {Observable} from 'rxjs/Observable';
import {MapMunicipalities} from '../Utilities/mapMunicipalities';
import {MapMunicipality} from '../models/mapMunicipality';
import {MapSelections} from '../Utilities/mapSelections';
import {SnackBarService} from '../services/snack-bar.service';
import {Constants} from '../models/constants';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-map-select-dialog',
  templateUrl: './map-select-dialog.component.html',
  styleUrls: ['./map-select-dialog.component.scss']
})
export class MapSelectDialogComponent implements OnInit {
  // municipalities: Municipality[];
  // selectedMunicipalities: MapMunicipality[];
  selectedMunicipalities: Municipality[];
  mapSelections: MapSelections;
 // selectedMapMunicipalityIds: string[];
  mousedOverMunicipality = null;
  // unincorporatedCount: number;
  maxSelectedMunicipalities = Constants.MAX_SELECTED_MUNICIPALITIES;
  optionsForMap: object = null;
  layersForMap: object = null;
  geoJsonData: any;
  geoJsonObj: any;
  showMaxSelectedWarningMessage = false;

  mapMunicipalities: MapMunicipalities;

  constructor(private http: HttpClient,
              private muniService: MunicipalitiesService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private zone: NgZone) { }

  highlightStyle = {
    weight: 3,
    color: 'blue',
    fillColor: 'blue',
    dashArray: '',
    fillOpacity: 0.5
  };

  outlineStyle = {
    weight: 3,
    color: 'blue',
    fillColor: '',
    dashArray: '',
    fillOpacity: 0
  };

  muniRemoved(municipality: Municipality) {
    this.selectedMunicipalities = this.mapSelections.removeMunicipality(municipality);
  }

  onMapReady(map: any) {
    const self = this;

    function highlightFeature(e) {
      const mapMunicipality = self.mapMunicipalities.getMapMunicipality(e.target.feature.id);
      if (!mapMunicipality.isSelected) {
        const layer = e.target;
        layer.setStyle(self.outlineStyle);

        if (!Browser.ie && !Browser.edge) {
          layer.bringToFront();
        }
      }
      self.zone.run(() => {
        self.mousedOverMunicipality = mapMunicipality;
      });
    }

    function resetHighlight(e) {
      if (!self.mapMunicipalities.getMapMunicipality(e.target.feature.id).isSelected) {
        self.geoJsonObj.resetStyle(e.target);
      }
      self.zone.run(() => {
        self.mousedOverMunicipality = null;
      });
    }

    function selectMunicipality(e) {
      const mapMunicipality = self.mapMunicipalities.getMapMunicipality(e.target.feature.id);
      mapMunicipality.geoJsonTarget = e.target;
      if (mapMunicipality.isSelected) {
        self.zone.run(() => {
          // self.removeMuncipality(mapMunicipality);
          self.selectedMunicipalities = self.mapSelections.removeMapMuncipality(mapMunicipality);
        });
        self.geoJsonObj.resetStyle(e.target);
      } else {
        self.zone.run(() => {
          self.selectedMunicipalities = self.mapSelections.addMunicipality(mapMunicipality);
        });
        const layer = e.target;
        layer.setStyle(self.highlightStyle);
        if (!Browser.ie && !Browser.edge) {
          layer.bringToFront();
        }
      }
    }

    this.geoJsonObj = geoJSON(this.geoJsonData, {
      style: function(feature) {
        return {
          fillColor: '',
          weight: 1,
          opacity: 1,
          color: 'blue',
          dashArray: '',
          fillOpacity: 0
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: selectMunicipality
        });
      }
    }).addTo(map);
    this.mapSelections.setGeoJsonObj(this.geoJsonObj);
  }

  mapSetup() {
    this.optionsForMap = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
      ],
      zoom: 10,
      center: latLng(38.62775, -90.381801)
    };
    this.layersForMap = [];
  }


  ngOnInit() {
    this.selectedMunicipalities = this.data.selectedMunicipalities;
    this.mapSelections = new MapSelections();

    const muniObs$ = this.muniService.findAll();
    const httpObs$ = this.http.get('assets/stlCountyMunicipalBoundaries.json');

    Observable.zip( httpObs$, muniObs$, (jsonData: any, munis: Municipality[]) => ({jsonData, munis}))
      .subscribe(result => {
        this.geoJsonData = result.jsonData;
        this.mapMunicipalities = new MapMunicipalities(result.munis, this.geoJsonData);
        this.mapSetup();
      });
  }
}
