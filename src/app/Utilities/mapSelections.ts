import {MapMunicipality} from '../models/mapMunicipality';
import {Municipality} from '../models/municipality';

export class MapSelections {
  selectedMunicipalities: MapMunicipality[] = [];
  maxSearchMunicipalities = 5;
  geoJsonObj: any = null;

  addMunicipality(mapMunicipality: MapMunicipality): Municipality[] {
    this.selectedMunicipalities.push(mapMunicipality);
    mapMunicipality.isSelected = true;
    return this.getSelectedUniqueMunicipalities();
  }

  removeMapMuncipality(mapMunicipality: MapMunicipality): Municipality[] {
    const selectedIndex = this.selectedMunicipalities.findIndex((mapMuni) => {
      return mapMuni.mapId === mapMunicipality.mapId;
    });

    this.selectedMunicipalities.splice(selectedIndex, 1);
    mapMunicipality.isSelected = false;
    return this.getSelectedUniqueMunicipalities();
  }

  removeMunicipality(municipality: Municipality): Municipality[] {
    this.selectedMunicipalities = this.selectedMunicipalities.filter( (selectedMuni) => {
      if (selectedMuni.name === municipality.name) {
        // get a real copy of the muni we are removing so it can get unselected
//        this.selectedMunicipalities.find((selectedMuniToFind) => {
//          return selectedMuniToFind.id === selectedMuni.id;
//        }).isSelected = false;
        selectedMuni.isSelected = false;
        this.geoJsonObj.resetStyle(selectedMuni.geoJsonTarget);
        return false;
      } else {
        return true;
      }
    });

    return this.getSelectedUniqueMunicipalities();
  }

  getUnincorporatedCount(): number {
    let unincorporatedCount = 0;
    this.selectedMunicipalities.forEach((mapMuni) => {
      if (mapMuni.isUnincorporated) {
        unincorporatedCount++;
      }
    });
    return unincorporatedCount;
  }

  isMunicipalityAlreadySelected(mapMunicipality: MapMunicipality): boolean {
    /* Because Unincorporated St. Louis County is split into different areas on the map
       it could be selected different times (i.e. different mapIds.  Here we want to knnow
       if the actual municipality has already been placed in the selected list.
     */
    return this.selectedMunicipalities.findIndex( selectedMuni => {
      return (mapMunicipality.id === selectedMuni.id);
    }) > -1;
  }

  getSelectedUniqueMunicipalities(): Municipality[]{
    const uniqueMunis: Municipality[] = []
    this.selectedMunicipalities.forEach( (mapMuni) => {
      if (uniqueMunis.findIndex( (muni) => {
        return muni.id === mapMuni.id;
        }) === -1) {
        uniqueMunis.push(mapMuni.getMunicipality());
      }
    });
    return uniqueMunis;
  }

  setGeoJsonObj(geoJsonObj: any) {
    this.geoJsonObj = geoJsonObj;
  }
}
