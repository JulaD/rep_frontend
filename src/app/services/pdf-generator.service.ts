import { Injectable } from '@angular/core';
import { jsPDF, TextOptionsLight } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { montserratFont } from 'src/assets/fonts/monserratFont';
import FranjaEtaria from '../enums/FranjaEtaria';
import { ResultPdf } from '../models/result-pdf.model';

/**
 * Servicio encargado de generar pdfs client side.
 */
@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  /**
   * Añado la fuente Montserrat para que pueda ser utilizada en el pdf.
   * @param pdf generador del pdf
   */
  addMontserratFont(pdf : jsPDF) {
    pdf.addFileToVFS('Montserrat-Regular.ttf', montserratFont);
    pdf.addFont('Montserrat-Regular.ttf', 'MontserratRegular', 'normal');
  }

  /**
   * Genera y dispara la descarga de un archivo pdf con los resultados del cálculo
   * realizado previamente.
   * @param res datos del cálculo realizado a ser cargados en el pdf
   */
  generateResults(res : ResultPdf) {
    // eslint-disable-next-line new-cap
    const doc: jsPDF = new jsPDF();

    // Logo REP!
    const logo : HTMLImageElement = document.createElement('img');
    logo.src = '../../../../../assets/ilustrations/REP_ RequerimientoEnergéticoPoblacional.png';
    doc.addImage(logo, 10, 10, 130, 30);

    // Imagen
    const img : HTMLImageElement = document.createElement('img');
    img.src = '../../../../../assets/ilustrations/illustration1.png';
    doc.addImage(img, 140, 10, 60, 50);

    // Texto
    let opts: TextOptionsLight = {
      align: 'center',
    };
    opts = {
      align: 'justify',
      maxWidth: 190,
    };

    this.addMontserratFont(doc);
    doc.setFont('MontserratRegular');
    doc.setFontSize(9);
    doc.text('Escuela de Nutrición UdelaR', 10, 45);

    doc.setFontSize(12);
    doc.text(`Para la población ingresada de ${res.totalPopulation} ${this.mostrarPersonas(res.totalPopulation)}, el requerimiento energético diario promedio per capita es de ${res.totalPerCapitaRequirement} Kcal/día.`, 10, 70, opts);
    let rows: (string | number)[][] = [];
    let offset: number = 80;
    let nroTablas: number = 0;
    res.dataSources.forEach((data) => {
      if (nroTablas >= 7) {
        doc.addPage();
        nroTablas = 0;
        offset = 20;
      }
      data.source.data.forEach((element) => {
        rows.push([element.texto, element.femenino, element.masculino]);
      });
      // Generación de las tabla con los resultados
      autoTable(doc, {
        head: [[
          `${this.mostrarFranja(data.title)} (${data.subtitle} ${this.mostrarPersonas(data.subtitle)})`,
          `Femenino (${data.femenine} ${this.mostrarPersonas(data.femenine)})`,
          `Masculino (${data.masculine} ${this.mostrarPersonas(data.masculine)})`,
        ]],
        body: rows,
        startY: offset,
      });
      rows = [];
      offset += 30;
      nroTablas += 1;
    });
    const date = new Date();
    const fileName : string = `ResultadosREP_${
      date.getDate()}_${
      date.getMonth() + 1}_${
      date.getFullYear()}.pdf`;
    doc.save(fileName);
  }

  mostrarFranja(franja: string) {
    if (franja === FranjaEtaria.Meses_1 as string) {
      return '1 mes';
    }

    if (franja === FranjaEtaria.Anios_1 as string) {
      return '1 año';
    }

    return franja;
  }

  mostrarPersonas(cantidad: number) {
    if (cantidad === 1) {
      return 'persona';
    }

    return 'personas';
  }
}
