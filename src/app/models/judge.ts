export class Judge {
  id: number;
  judge: string;
  courtId: number;

  constructor(judgeName: string) {
    this.judge = judgeName;
    this.id = null;
    this.courtId = null;
  }
}
