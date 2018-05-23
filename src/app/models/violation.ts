export class Violation {
  citation_number: string;
  violation_number: string;
  violation_description: string;
  warrant_status: boolean;
  warrant_number: string;
  status: string;
  fine_amount: string;
  court_cost: string;
  can_pay_online: boolean;

  fromPOJO(pojo: Violation) {
    this.citation_number = pojo.citation_number;
    this.violation_number = pojo.violation_number;
    this.violation_description = pojo.violation_description;
    this.warrant_status = pojo.warrant_status;
    this.warrant_number = pojo.warrant_number;
    this.status = pojo.status;
    this.fine_amount = pojo.fine_amount;
    this.court_cost = pojo.court_cost;
    this.can_pay_online = pojo.can_pay_online;
  }
}
