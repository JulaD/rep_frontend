import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditorySearch } from 'src/app/models/auditory-search.model';
import { Log } from 'src/app/models/log.model';
import { AuditoryService } from 'src/app/services/auditory.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css'],
})
export class AuditoriaComponent implements OnInit {
  /**
   * Logs mostrados en la tabla.
   */
  logs: Log[] = [];
  /* [new Log(1,'1',1,'1','1','1'),
  new Log(2,'2',2,'2','2','2'),
  new Log(3,'3',3,'3','3','3')] */

  /**
   * Número total de logs encontrados para el/los filtros aplicados.
   */
  totalLogs: number = 0;

  /**
   * Total de logs a ser mostrados por página.
   */
  totalPerPage: number = 10;

  /**
   * Columnas que se despliegan en la tabla de resultados.
   * Nota: el orden en el que se muestran las columnas se define en el template de
   * este componente y NO por el orden de inserción en este arreglo.
   */
  displayedColumns: string[] = ['fecha', 'accion', 'email', 'nombre', 'organizacion'];

  constructor(private errorSnackBar: MatSnackBar,
    public auditoryService: AuditoryService,
    private router: Router) { }

  ngOnInit(): void {
    const auditorySearch : AuditorySearch = new AuditorySearch(this.totalPerPage, 1);
    this.getLogs(auditorySearch);
  }

  /**
   * Obtiene los logs que cumplen con los parámetros de búsqueda.
   */
  getLogs(search : AuditorySearch) {
    this.auditoryService.getLogs(search).subscribe(
      (res) => {
        this.logs = res.list;
        this.totalLogs = res.count;
      },
      (err) => {
        const errorMessage = err.error.error ? err.error.error : 'Ocurrió un error al realizar la auditoría, intente de nuevo más tarde.';
        const config : MatSnackBarConfig = new MatSnackBarConfig();
        config.panelClass = ['error-snack-bar'];
        config.verticalPosition = 'top';
        this.errorSnackBar.open(errorMessage, 'X', config);
      },
    );
  }

  /**
   * Carga los parámetros de búsqueda y dispara la misma.
   * @param event evento disparado al cambiar de página en la tabla de resultados
   */
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-plusplus */
  goToPage(event : PageEvent) {
    const auditorySearch: AuditorySearch = new AuditorySearch(this.totalPerPage, ++event.pageIndex);
    this.getLogs(auditorySearch);
  }
}
