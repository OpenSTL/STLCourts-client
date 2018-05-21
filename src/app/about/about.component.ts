import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {SmsinfoService} from '../services/smsinfo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  phoneNumber = '';

  constructor(private contactService: ContactService,
              private smsInfoService: SmsinfoService) {}

  getContactEmail() {
    return this.contactService.email;
  }

  textPhoneNumber() {
    return this.phoneNumber;
  }

  ngOnInit() {
    this.smsInfoService.getPhoneNumber().subscribe((phoneNum) => {
      this.phoneNumber = phoneNum;
    });
  }
}
