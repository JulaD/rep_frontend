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

  pisDescription: string = 'El Proyecto de Ingeniería de Software pertenece a las unidades curriculares de la carrera de Ingeniero en Computación de la Facultad de Ingeniería, UdelaR.<br><br>'
    + 'Busca afirmar y profundizar los conocimientos de Ingeniería de Software, contrastarlos con su aplicación práctica e integrarlos con conocimientos de otras unidades curriculares.<br><br>'
    + 'Es un proyecto guiado y controlado sometido a diversos tipos de restriciccions análogas a las que son comunes en la industria, para posibilitar una reflexión sobre los conocimientos teóricos a la luz de su aplicación práctica.<br><br>';

  pisDescriptionSource: string = 'Fuente: Programa de PROYECTO DE INGENIERÍA DE SOFTWARE';

  // CLIENTES

  clientsDescription: string = 'El objetivo fue desarrollar una  aplicación  que  calculara  el requerimiento energético ponderado de una población así como de los diferentes grupos de edad y género que la conforman.<br><br>'
  + 'El cliente solicitó <em>"...una aplicación con una interfaz de fácil comprensión y amigable para el trabajo de los Licenciados en Nutrición, ligera y con capacidad para ser utilizada en computadoras personales"</em>.<br><br>'
  + 'La misma sería utilizada a nivel de instituciones/organizaciones públicas y privadas que requirieran la determinación de requerimientos nutricionales de los grupos de población con los que trabajan.';

  clients: ResponsibleInfo[] = [
    {
      nombre: 'Ana Paula Della Santa',
      profesion: 'Lic. en Nutrición',
      institucion: 'Escuela de Nutrición, Dpto. de Nutrición Poblacional',
      descripcion: '',
      img: '../../../../../assets/developersImages/defaultProfile.jpg',
    }, {
      nombre: 'Gabriela Fajardo',
      profesion: 'Lic. en Nutrición',
      institucion: 'Escuela de Nutrición, Dpto. de Nutrición Poblacional',
      descripcion: '',
      img: '../../../../../assets/developersImages/defaultProfile.jpg',
    }, {
      nombre: 'Víctor Viana',
      profesion: '',
      institucion: 'Facultad de Ingeniería, CENUR Noreste',
      descripcion: '',
      img: '../../../../../assets/developersImages/defaultProfile.jpg',
    },
  ];

  // DIRECTORA

  directorDescription: string = 'El director de un proyecto es la persona a la que el responsable de la empresa ha asignado la tarea de liderar un equipo con la función de conseguir ciertos objetivos.<br><br>'
    + 'En el marco de P.I.S., es un docente el que actúa como Director de Proyecto de cada grupo, manteniendo reuniones semanales con el mismo, a la vez que realiza una evaluación continua del grupo sobre la base de las entregas y reuniones.';

  director: ResponsibleInfo = {
    nombre: 'Msc. Ing. Leticia Pérez Queiruga',
    profesion: '',
    institucion: 'Facultad de Ingeniería',
    descripcion: '',
    img: '../../../../../assets/developersImages/defaultProfile.jpg',
  };

  // ABOUT-US

  aboutUsDescription: string = 'Descripción del grupo de proyecto.';

  information: AboutUsInfo[] = [
    {
      nombre: 'Julieta Dubra',
      rol: [Rol.SCM, Rol.Desarrollador, Rol.EspecialistaTecnico],
      img: '../../../../../assets/developersImages/Jula.jfif',
      linkedin: '',
    }, {
      nombre: 'Renzo Beux',
      rol: [Rol.Desarrollador, Rol.EspecialistaTecnico],
      img: '../../../../../assets/developersImages/Renzo.jfif',
      linkedin: 'https://www.linkedin.com/in/renzo-beux/',
    }, {
      nombre: 'Agustín Tornaria',
      rol: [Rol.Administrador, Rol.ResponsableComunicacion],
      img: '../../../../../assets/developersImages/AgustínT.jfif',
      linkedin: 'https://www.linkedin.com/in/agust%C3%ADn-tornar%C3%ADa/',
    }, {
      nombre: 'Ignacio Otero',
      rol: [Rol.Desarrollador, Rol.EspecialistaTecnico],
      img: '../../../../../assets/developersImages/NachoO.jfif',
      linkedin: 'https://www.linkedin.com/in/ignacio-otero-057930225/',
    }, {
      nombre: 'Santiago Correa',
      rol: [Rol.Analista, Rol.DocumentadorUsuario, Rol.AsistenteVerificacion],
      img: '../../../../../assets/developersImages/Santi.jfif',
      linkedin: 'https://www.linkedin.com/in/santiago-correa-407027219/',
    }, {
      nombre: 'Ramiro Bentancor',
      rol: [Rol.Desarrollador, Rol.EspecialistaTecnico],
      img: '../../../../../assets/developersImages/Rama.jfif',
      linkedin: 'https://www.linkedin.com/in/ramiro-bentancor-romero-861273192',
    }, {
      nombre: 'Agustín Ruíz Díaz',
      rol: [Rol.AsistenteArquitecto, Rol.Analista, Rol.Desarrollador],
      img: '../../../../../assets/developersImages/AgusRu.jfif',
      linkedin: 'https://www.linkedin.com/in/agustinRuizDiaz',
    }, {
      nombre: 'Nicolás San Martín',
      rol: [Rol.SQA, Rol.AsistenteVerificacion],
      img: '../../../../../assets/developersImages/Nico.jfif',
      linkedin: 'https://www.linkedin.com/in/nicolás--san-martín',
    }, {
      nombre: 'Daniel Martínez',
      rol: [Rol.Desarrollador, Rol.EspecialistaTecnico],
      img: '../../../../../assets/developersImages/Daniel.jfif',
      linkedin: 'https://www.linkedin.com/in/daniel-martinez-ameijenda',
    }, {
      nombre: 'Luis Costela',
      rol: [Rol.Arquitecto, Rol.CoordinadorDesarrollo, Rol.AsistenteVerificacion],
      img: '../../../../../assets/developersImages/Luis.jfif',
      linkedin: 'https://www.linkedin.com/in/luis-costela-b92414110/',
    }, {
      nombre: 'Felipe Almeida',
      rol: [Rol.Verificacion, Rol.AsistenteSQA],
      img: '../../../../../assets/developersImages/Fefo.jfif',
      linkedin: 'https://www.linkedin.com/in/felipe-almeida-isern-527a19226/',
    }, {
      nombre: 'Ignacio Bengoa',
      rol: [Rol.Analista, Rol.Desarrollador],
      img: '../../../../../assets/developersImages/IgnacioB.jfif',
      linkedin: 'https://www.linkedin.com/in/ignacio-bengoa-nión-17832a226',
    }, {
      nombre: 'Agustín Rodriguez',
      rol: [Rol.Analista, Rol.Desarrollador],
      img: '../../../../../assets/developersImages/AgusRo.jfif',
      linkedin: 'https://www.linkedin.com/in/agustin-rodriguez-2a6a26226/',
    }, {
      nombre: 'Belén Echechury',
      rol: [Rol.InterfazDeUsuario, Rol.Analista, Rol.Desarrollador],
      img: '../../../../../assets/developersImages/Belen.jfif',
      linkedin: '',
    },
  ];

  ngOnInit(): void {
    this.clients.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      }
      if (a.nombre > b.nombre) {
        return 1;
      }
      return 0;
    });
    this.information.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      }
      if (a.nombre > b.nombre) {
        return 1;
      }
      return 0;
    });
  }
}
