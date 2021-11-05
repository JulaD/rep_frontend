import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsSearch } from 'src/app/models/logs-search.model';
import { Log } from 'src/app/models/log.model';
import { AuditoryService } from 'src/app/services/auditory.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { DatePipe, registerLocaleData } from '@angular/common';

import localeEsUy from '@angular/common/locales/es-UY';
import { ScaleType } from '@swimlane/ngx-charts';
import { FormControl, FormGroup } from '@angular/forms';
import { StatisticsSearch } from 'src/app/models/statistics-search.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services';
import { Subject } from 'rxjs/internal/Subject';

registerLocaleData(localeEsUy, 'esUY');

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css'],
})
export class AuditoriaComponent implements OnInit {
  // --------------------- AUDITORÍA ---------------------

  /**
   * Logs mostrados en la tabla.
   */
  logs: Log[] = []; /* [
    new Log(2, '2', 2, '2', '2', '2'),
    new Log(3, '3', 3, '3', '3', '3')] ; */

  /**
   * Número total de logs encontrados para el/los filtros aplicados.
   */
  totalLogs: number = 0;

  /**
   * Total de logs por defecto a ser mostrados por página.
   */
  totalPerPage: number = 10;

  /**
   * Columnas que se despliegan en la tabla de resultados.
   */
  displayedColumns: string[] = ['fecha', 'email', 'organizacion', 'nombre', 'accion'];

  // --------------------- ESTADÍSTICAS ---------------------

  // Observable para update de los datos de la gráfica
  update$: Subject<any> = new Subject();

  // Filtros de búsqueda
  users = new FormControl();

  dateRange = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  // ComboBox usuarios
  usersList: User[];

  // Datos a graficar
  statistics: any[];

  // Opciones de la gráfica de barras
  showXAxis = true;

  showYAxis = true;

  gradient = true;

  showLegend = true;

  legendTitle = '';

  showXAxisLabel = true;

  xAxisLabel = 'MÉTODO DE CARGA DE LOS DATOS';

  showYAxisLabel = true;

  yAxisLabel = 'NÚMERO DE USOS';

  byHandLabel: string = 'A mano';

  templateLabel: string = 'Plantilla';

  // Esquema de colores
  colorScheme = {
    name: 'verticalBarChartColors',
    selectable: false,
    group: ScaleType.Time,
    domain: ['#c28de9', '#ccfdff'],
  };

  constructor(
    private errorSnackBar: MatSnackBar,
    public auditoryService: AuditoryService,
    private router: Router,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    const logsSearch: LogsSearch = new LogsSearch(this.totalPerPage, 1);
    this.getLogs(logsSearch);
    this.getUsers();
    this.getStatistics();
  }

  goToLogs() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.remove('active');
    }
  }

  goToStatistics() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.add('active');
    }
  }

  /**
   * Obtiene los logs que cumplen con los parámetros de búsqueda.
   */
  getLogs(search : LogsSearch) {
    this.auditoryService.getLogs(search).subscribe(
      (res) => {
        this.logs = res.list;
        /* eslint-disable no-param-reassign */
        this.logs.forEach((log) => {
          const datepipe: DatePipe = new DatePipe('esUY');
          const formattedDate = datepipe.transform(log.date, 'MMM d, y, h:mm:ss a');
          if (formattedDate) {
            log.date = formattedDate;
          } else {
            const errorMessage = `Ocurrió un error al parsear la fecha ${log.date}`;
            const config : MatSnackBarConfig = new MatSnackBarConfig();
            config.panelClass = ['error-snack-bar'];
            config.verticalPosition = 'top';
            this.errorSnackBar.open(errorMessage, 'X', config);
          }
        });
        this.totalLogs = res.count;
      },
      (err) => {
        const errorMessage = err.error.error ? err.error.error : 'Ocurrió un error al obtener los logs, intente de nuevo más tarde.';
        this.showError(errorMessage);
      },
    );
  }

  /**
   * Carga los parámetros de búsqueda y dispara la misma.
   * @param event evento disparado al cambiar de página en la tabla de resultados
   */
  /* eslint-disable no-param-reassign */
  goToPage(event : PageEvent) {
    const auditorySearch: LogsSearch = new LogsSearch(event.pageSize, event.pageIndex + 1);
    this.getLogs(auditorySearch);
  }

  /**
   * Obtiene las estadísticas para los parámetros de búsqueda.
   */
  getStatistics() {
    this.statistics = [];
    const usersIds: number[] = this.users.value ? this.users.value : [];
    let dateFrom: string = '';
    let dateTo: string = '';
    if (this.dateRange.value.from) {
      dateFrom = this.dateRange.value.from.toString();
    }
    if (this.dateRange.value.to) {
      dateTo = this.dateRange.value.to.toString();
    }
    const statisticsSearch: StatisticsSearch = new StatisticsSearch(usersIds, dateFrom, dateTo);
    this.auditoryService.getStatistics(statisticsSearch).subscribe(
      (res) => {
        const dataList: any[] = [];
        res.forEach((data: any) => {
          let name = '';
          switch (data.extra.code) {
            case 'cam':
              name = this.byHandLabel;
              break;
            case 'cup':
              name = this.templateLabel;
              break;
            default:
              break;
          }
          if (name !== '') {
            dataList.push({
              name,
              value: data.value,
            });
          }
        });
        this.statistics = dataList;
        this.update$.next(true);
      },
      (err) => {
        const errorMessage = err.error.error ? err.error.error : 'Ocurrió un error al obtener las estadísticas, intente de nuevo más tarde.';
        this.showError(errorMessage);
      },
    );
  }

  /**
   * Restablece los parámetros de búsqueda para las estadísticas.
   */
  resetStatistics() {
    this.users.reset();
    this.dateRange.reset();
    this.getStatistics();
  }

  /**
   * Obtiene el listado de usuarios para el comboBox.
   */
  getUsers() {
    this.userService.getUsers('approved', 0, 0, '').subscribe(
      (res) => {
        this.usersList = res.rows;
      },
    );
  }

  /**
   * Despliega mensaje de error
   */
  showError(errMessage: string) {
    const config : MatSnackBarConfig = new MatSnackBarConfig();
    config.panelClass = ['error-snack-bar'];
    config.verticalPosition = 'top';
    this.errorSnackBar.open(errMessage, 'X', config);
  }
}
