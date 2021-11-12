import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FAQ } from 'src/app/models/faq.model';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css'],
})
export class ManualsComponent implements OnInit {
  faqs: FAQ[] = [];

  constructor(
    private service: FAQService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.getFAQs();
  }

  getFAQs(): void {
    this.spinner.show();
    this.service
      .getFAQs()
      .subscribe((faqs: FAQ[]) => {
        this.spinner.show();
        this.faqs = faqs;
      }, () => {
        this.spinner.hide();
      });
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.download = 'manualDeUsuarioREP.pdf';
    link.href = 'assets/files/manualDeUsuarioREP.pdf';
    link.click();
  }
}
