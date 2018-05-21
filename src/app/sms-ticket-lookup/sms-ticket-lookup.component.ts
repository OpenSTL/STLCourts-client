import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SecurityDialogComponent} from '../security-dialog/security-dialog.component';
import {CitationParameters} from '../models/citation-parameters';
import {MatDialog} from '@angular/material';
import {CitationService} from '../services/citation.service';

@Component({
  selector: 'app-sms-ticket-lookup',
  templateUrl: './sms-ticket-lookup.component.html',
  styleUrls: ['./sms-ticket-lookup.component.scss']
})
export class SmsTicketLookupComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private citationService: CitationService,
              private router: Router) { }

  openSecurityDialog(ticketNum: string) {
    const dialogRef = this.dialog.open(SecurityDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const citationParams = new CitationParameters(result.dob,
          result.lastName,
          ticketNum,
          '',
          '',
          []
        );

        this.citationService.find(citationParams.getHttpParams()).subscribe((citations) => {
          this.citationService.setCurrentCitations(citations);
          if (citations.length > 0) {
            this.router.navigate(['tickets/info']);
          } else {
            this.router.navigate(['tickets/error/notFound']);
          }
        });
      } else {
        this.router.navigate(['tickets/info']);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const ticketNum = paramMap.get('ticketNum');
      // use set time out to open dialog, otherwise ExpressionChangedAfterItHasBeenCheckedError is generated
      setTimeout(() => {
        this.openSecurityDialog(ticketNum);
      });
    });
  }
}
