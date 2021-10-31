import { Component, OnInit } from '@angular/core';
import { AboutUsInfo } from 'src/app/models/about-us-info.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  information: AboutUsInfo[] = [{ apodo: 'Jula', nombre: 'Julieta Dubra', descripcion: 'Hola soy Jula' }, { apodo: 'Renzito', nombre: 'Renzo Beux', descripcion: 'Hola soy Renzo' }];

  ngOnInit(): void {
  }
}
