import {Judge} from './judge';

export class Court {
  id: string;
  name: string;
  phone: string;
  website: string;
  extension: string;
  address: string;
  paymentSystem: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  judges: Judge[];
  citationExpiresAfterDays: number;
  rights_type: string;
  rights_value: string;
  zone_id: string;

  paymentUrl: string;  /* currently not returned from server */

  constructor() {
    this.id = null;
    this.name = '';
    this.phone = '';
    this.website = '';
    this.extension = '';
    this.address = '';
    this.paymentSystem = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.latitude = null;
    this.longitude = null;
    this.judges = [];
    this.citationExpiresAfterDays = -1;
    this.rights_type = '';
    this.rights_value = '';
    this.zone_id = '';
    this.paymentUrl = '';
  }

  fromPOJO(pojo: Court) {
    this.id = pojo.id;
    this.name = pojo.name;
    this.phone = pojo.phone;
    this.website = pojo.website;
    this.extension = pojo.extension;
    this.address = pojo.address;
    this.paymentSystem = pojo.paymentSystem;
    this.city = pojo.city;
    this.state = pojo.state;
    this.zip = pojo.zip;
    this.latitude = pojo.latitude;
    this.longitude = pojo.longitude;
    this.judges = [];
    pojo.judges.forEach((pojoJudge: Judge) => {
      const judge: Judge = new Judge();
      judge.fromPOJO(pojoJudge);
      this.judges.push(judge);
    });
    this.citationExpiresAfterDays = pojo.citationExpiresAfterDays;
    this.rights_type = pojo.rights_type;
    this.rights_value = pojo.rights_value;
    this.zone_id = pojo.zone_id;
  }
}
