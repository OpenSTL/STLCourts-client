import { Component } from '@angular/core';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor( private contactService:ContactService) { }

  copyRightYears = function(){
    const startingYear:string = new Date(2016,0,1).getFullYear().toString();
    let crStmt:string = startingYear;
    const today = new Date();
    const year:number = today.getFullYear();
    if (Number(year) > Number(startingYear))
      crStmt = startingYear + "-" + year;
    return crStmt;
  };

  getContactEmail() {
    return this.contactService.email;
  }

}
