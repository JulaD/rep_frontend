import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/enums/rol';
import { AboutUsInfo } from 'src/app/models/about-us-info.model';
import { ResponsibleInfo } from 'src/app/models/responsible-info.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {

  // PROYECTO

  projectDescription: string = '';

  // PIS
  
  pisDescription: string = `El Proyecto de Ingeniería de Software pertenece a las unidades curriculares de la carrera de Ingeniero en Computación de la Facultad de Ingeniería, UdelaR.<br><br>`
    + `Busca afirmar y profundizar los conocimientos de Ingeniería de Software, contrastarlos con su aplicación práctica e integrarlos con conocimientos de otras unidades curriculares.<br><br>`
    + `Es un proyecto guiado y controlado sometido a diversos tipos de restriciccions análogas a las que son comunes en la industria, para posibilitar una reflexión sobre los conocimientos teóricos a la luz de su aplicación práctica.<br><br>`
  pisDescriptionSource: string = `Fuente: Programa de PROYECTO DE INGENIERÍA DE SOFTWARE`;

  // CLIENTES

  clientsDescription: string = `El objetivo fue desarrollar una  aplicación  que  calculara  el requerimiento energético ponderado de una población así como de los diferentes grupos de edad y género que la conforman.<br><br>` 
  + `El cliente solicitó <em>"...una aplicación con una interfaz de fácil comprensión y amigable para el trabajo de los Licenciados en Nutrición, ligera y con capacidad para ser utilizada en computadoras personales"</em>.<br><br>`
  + `La misma sería utilizada a nivel de instituciones/organizaciones públicas y privadas que requirieran la determinación de requerimientos nutricionales de los grupos de población con los que trabajan.`;

  clients: ResponsibleInfo[] = [
    {
      nombre: 'Ana Paula Della Santa',
      profesion: 'Lic. en Nutrición',
      institucion: 'Escuela de Nutrición, Dpto. de Nutrición Poblacional',
      descripcion: 'Espacio para breve presentación.',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, {
      nombre: 'Gabriela Fajardo',
      profesion: 'Lic. en Nutrición',
      institucion: 'Escuela de Nutrición, Dpto. de Nutrición Poblacional',
      descripcion: 'Espacio para breve presentación.',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, {
      nombre: 'Víctor Viana',
      profesion: '',
      institucion: 'Facultad de Ingeniería, CENUR Noreste',
      descripcion: 'Espacio para breve presentación.',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    },
  ]

  // DIRECTORA

  directorDescription: string = 'Descripción del rol de directora de proyecto en general y en el contexto dado del Proyecto de Ingenieria de Software.';
  
  director: ResponsibleInfo = {
    nombre: 'Leticia',
    profesion: '',
    institucion: 'Facultad de Ingeniería',
    descripcion: 'Espacio para breve presentación.',
    img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
  };

  // ABOUT-US

  aboutUsDescription: string = 'Descripción del grupo de proyecto.'
 
  information: AboutUsInfo[] = [
    { 
      nombre: 'Julieta Dubra', 
      rol: Rol.SCM,
      descripcion: 'Hola soy Jula',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Renzo Beux',
      rol: Rol.Desarrollador,
      descripcion: 'Hola soy Renzo', 
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Agustín Tornaria', 
      rol: Rol.SCM,
      descripcion: 'Hola soy Jula',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Ignacio Otero',
      rol: Rol.Desarrollador,
      descripcion: 'Hola soy Renzo', 
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    },{ 
      nombre: 'Santiago Correa', 
      rol: Rol.SCM,
      descripcion: 'Hola soy Jula',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Ramiro Bentancor',
      rol: Rol.Desarrollador,
      descripcion: 'Hola soy Renzo', 
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    },{ 
      nombre: 'Agustín Ruíz Díaz', 
      rol: Rol.SCM,
      descripcion: 'Hola soy Jula',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Nicolás San Martín',
      rol: Rol.Desarrollador,
      descripcion: 'Hola soy Renzo', 
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    },{ 
      nombre: 'Daniel Martínez', 
      rol: Rol.SCM,
      descripcion: 'Hola soy Jula',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Luis Costela',
      rol: Rol.Desarrollador,
      descripcion: 'Hola soy Renzo', 
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    },{ 
      nombre: 'Felipe Almeida', 
      rol: Rol.SCM,
      descripcion: 'Hola soy Jula',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Ignacio Bengoa',
      rol: Rol.Desarrollador,
      descripcion: 'Hola soy Renzo', 
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    },{ 
      nombre: 'Agustín Rodriguez', 
      rol: Rol.SCM,
      descripcion: 'Hola soy Jula',
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }, { 
      nombre: 'Belén Echechury',
      rol: Rol.Desarrollador,
      descripcion: 'Hola soy Renzo', 
      img: 'https://i.pinimg.com/564x/f3/6d/27/f36d2783ac3099cde493066550b64f8b.jpg'
    }
  ];

  ngOnInit(): void {
    this.clients.sort(function(a, b){
      if (a.nombre < b.nombre) { 
        return -1; 
      }
      if (a.nombre > b.nombre) { 
        return 1; 
      }
      return 0;
    })
    this.information.sort(function(a, b){
      if (a.nombre < b.nombre) { 
        return -1; 
      }
      if (a.nombre > b.nombre) { 
        return 1; 
      }
      return 0;
    })
  }
}
