export class Faq {
  q: string;
  a: string;
  keywords: string[];
  fillIn: string;

  colSpan: number;
  rowSpan: number;
  itemColor: string;
  colorClass: string;

  constructor(q: string, a: string, keywords: string[], fillIn: string) {
    this.q = q;
    this.a = a;
    this.keywords = keywords;
    this.fillIn = fillIn;
  }
}
