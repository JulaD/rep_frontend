import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: ['./calculos.component.css'],
})
export class CalculosComponent implements OnInit {
  ngOnInit(): void {
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.download = 'PlantillaEstandar.xlsx';
    link.href = 'assets/files/planillaEstandar.xlsx';
    link.click();
  }
}
