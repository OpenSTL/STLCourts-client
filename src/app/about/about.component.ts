import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {SmsinfoService} from '../services/smsinfo.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  phoneNumber$: Observable<string>;
  contactEmail: string;

  constructor(private contactService: ContactService,
              private smsInfoService: SmsinfoService) {}

  ngOnInit() {
    this.phoneNumber$ = this.smsInfoService.getPhoneNumber();
    this.contactEmail = this.contactService.email;
  }
}
