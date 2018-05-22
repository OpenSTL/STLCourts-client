export class Judge {
  id: number;
  judge: string;
  courtId: number;

  constructor() {
    this.judge = '';
    this.id = null;
    this.courtId = null;
  }

  fromPOJO(pojo: Judge) {
    this.id = pojo.id;
    this.judge = pojo.judge;
    this.courtId = pojo.courtId;
  }
}
