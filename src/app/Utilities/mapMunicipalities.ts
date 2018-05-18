import {MapMunicipality} from '../models/mapMunicipality';
import {Municipality} from '../models/municipality';

export class MapMunicipalities {
  mapMunicipalities: MapMunicipality[];
  municipalities: Municipality[];

  constructor(municipalities: Municipality[],
              geoJsonData: any) {
    this.municipalities = municipalities;
    this.mapMunicipalities = [];
    this.createMapMunicipalities(geoJsonData);
  }

  private createMapMunicipalities(geoJsonData: any) {
    const self = this;
    geoJsonData.features.forEach((feature) => {
      const mapId = feature.id;
      const muniName = feature.properties.municipality;
      const municipality = this.getMunicipalityFromMapName(muniName);
      if (municipality) {
        const mapMuni = new MapMunicipality(municipality, mapId);
        self.mapMunicipalities.push(mapMuni);
      }
    });
  }

  private getMunicipalityFromMapName(muniMapName) {
    function getName(nameString) {
      if (nameString.toLowerCase() === 'unincorporated') {
        nameString = 'St. Louis County Municipal';
      }

      return nameString.replace('&', 'and');
    }

    return this.municipalities.find((municipality) => {
      return municipality.name.toLowerCase() === getName(muniMapName).toLowerCase();
    });
  }

  public getMapMunicipality(mapId: string) {
    return this.mapMunicipalities.find((mapMuni) => {
      return mapMuni.mapId === mapId;
    });
  }
}
