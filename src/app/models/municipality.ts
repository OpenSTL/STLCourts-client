import {Court} from './court';

export class Municipality {
  id: string;
  name: string;
  courts: Court[];
  paymentUrl: string;
  isSupported: boolean;
}
