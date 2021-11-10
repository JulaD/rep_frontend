import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FAQ } from 'src/app/models/faq.model';
import { FAQService } from 'src/app/services/faq.service';
import Swal from 'sweetalert2';
import { FaqFormComponent } from '../faq-form/faq-form.component';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
})
export class FaqsComponent implements OnInit {
  faqs: FAQ[];

  constructor(
    private service: FAQService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getFAQs();
  }

  toggleQuestion(id: number) {
    const question = document.getElementById(id.toString());
    if (question) {
      question.classList.toggle('active');
    }
  }

  upsertFaq(faq?: FAQ): void {
    const modal = this.dialog.open(FaqFormComponent, {
      height: 'auto',
      width: '50%',
      position: {
        top: '20vh',
      },
      data: {
        faq,
      },
    });
    modal
      .afterClosed()
      .subscribe((result: {
        success: boolean,
        close: boolean
      }) => {
        if (result?.success) {
          if (faq) {
            Swal.fire('¡Éxito!', 'Pregunta frecuente actualizada.', 'success');
          } else {
            Swal.fire('¡Éxito!', 'Pregunta frecuente ingresada.', 'success');
          }
          this.getFAQs();
        } else if (!result?.close && faq) {
          Swal.fire('¡Ups!', 'No se ha podido actualizar la pregunta.', 'error');
        } else if (!result?.close) {
          Swal.fire('¡Ups!', 'No se ha podido ingresar la nueva pregunta.', 'error');
        }
      });
  }

  async deleteFaq(faq: FAQ) {
    const operation = await Swal.fire({
      title: 'Eliminando pregunta frecuente',
      text: '¿Seguro desea eliminar esta pregunta?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      heightAuto: false,
    });
    if (operation.isConfirmed) {
      this.spinner.show();
      this.service
        .deleteFAQ(faq.id)
        .subscribe((result: boolean) => {
          const boolResult = result as boolean;
          if (boolResult) {
            this.getFAQs();
            Swal.fire('¡Éxito!', 'Pregunta frecuente eliminada.', 'success');
          } else {
            Swal.fire('¡Ups!', 'No se ha podido eliminar la pregunta.', 'error');
          }
        }, () => {
        // Error
        });
    }
  }

  getFAQs(): void {
    this.service
      .getFAQs()
      .subscribe((faqs: FAQ[]) => {
        this.faqs = faqs;
      }, (error: Error) => {
        console.log(error);
      });
  }
}
