import {Municipality} from './municipality';

export class MapMunicipality extends Municipality {
  mapId: string;
  isSelected: boolean;
  isUnincorporated: boolean;
  geoJsonTarget: any;

  constructor(municipality: Municipality, mapId: string) {
    super();
    this.id = municipality.id;
    this.name = municipality.name;
    this.courts = municipality.courts;
    this.paymentUrl = municipality.paymentUrl;
    this.isSupported = municipality.isSupported;
    this.mapId = mapId;
    this.isSelected = false;
    this.isUnincorporated = this.name.toLowerCase().indexOf('unincorporated') >= 0;
    this.geoJsonTarget = null;
  }

  getMunicipality(): Municipality {
    const muni = new Municipality();
    muni.id = this.id;
    muni.name = this.name;
    muni.courts = this.courts;
    muni.paymentUrl = this.paymentUrl;

    return muni;
  }
}
