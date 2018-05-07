import {Judge} from './judge';

export class Court {
  id: number;
  name: string;
  phone: string;
  website: string;
  extension: string;
  address: string;
  paymentSystem: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  judges: Judge[];
  citationExpiresAfterDays: number;
  rights_type: string;
  rights_value: string;
  zone_id: string;

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
    this.zipCode = '';
    this.latitude = null;
    this.longitude = null;
    this.judges = [];
    this.citationExpiresAfterDays = -1;
    this.rights_type = '';
    this.rights_value = '';
    this.zone_id = '';
  }
}
