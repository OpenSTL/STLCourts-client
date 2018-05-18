import {Court} from './court';

export class Municipality {
  id: string;
  name: string;
  courts: string[];
  paymentUrl: string;
  isSupported: boolean;

  constructor() {
    this.id = null;
    this.name = '';
    this.courts = [];
    this.paymentUrl = '';
    this.isSupported = null;
  }
}
