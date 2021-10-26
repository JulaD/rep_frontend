import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FAQ } from 'src/app/models/faq.model';
import { FAQService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css'],
})
export class FaqFormComponent implements OnInit {
  form = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required)
  });

  isNew: boolean = true;

  faq: FAQ;

  constructor(
    private service: FAQService,
    public dialog: MatDialogRef<any>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data?: {faq: FAQ},
  ) {
    this.dialog.disableClose = true;
    this.dialog
      .backdropClick()
      .subscribe(() => {
        this.close();
      });
  }

  ngOnInit(): void {
    if (this.data?.faq) {
      this.faq = this.data?.faq;
      this.isNew = false;
      const faq: FAQ = this.data?.faq;
      this.form.setValue({
        question: faq.question,
        answer: faq.answer,
        position: faq.position
      });
    }
  }

  onConfirm(): void {
    if (this.isNew) {
      this.create();
    } else {
      this.update();
    }
  }

  create(): void {
    this.spinner.show();
    this.service
      .createFAQ(this.form.value)
      .subscribe(() => {
        this.spinner.hide();
        // Success
        this.dialog.close({
          success: true
        });
      }, () => {
        this.spinner.hide();
        // Error
        this.dialog.close({
          success: false
        });
      });
  }

  update(): void {
    this.spinner.show();
    this.service
      .updateFAQ(this.faq.id, this.form.value)
      .subscribe(() => {
        this.spinner.hide();
        // Success
        this.dialog.close({
          success: true
        });
      }, () => {
        this.spinner.hide();
        // Error
        this.dialog.close({
          success: false
        });
      });
  }

  async close() {
    this.dialog.close({
      success: false,
      close: true,
    });
  }
}
