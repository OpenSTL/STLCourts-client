export class Municipality {
  id: string;
  name: string;
  courts: string[]; /* array of court ids */
  paymentUrl: string;
  isSupported: boolean;

  constructor() {
    this.id = null;
    this.name = '';
    this.courts = [];
    this.paymentUrl = '';
    this.isSupported = null;
  }

  fromPOJO(pojo: Municipality) {
    this.id = pojo.id;
    this.name = pojo.name;
    this.courts = pojo.courts;
    this.paymentUrl = pojo.paymentUrl;
    this.isSupported = pojo.isSupported;
  }
}
