import {
  HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest,
} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ParsedDataService } from 'src/app/services/parsed-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css'],
})
export class UploadTemplateComponent implements OnInit {
  data : string;

  // Archivo
  @Input()
  requiredFileType: string = '.xls';

  fileName: string = '';

  fileToUpload: File;

  // Progreso
  uploadProgress: number;

  uploading: boolean;

  readyToUpload: boolean = false;

  // Request
  headers: Headers = new Headers();

  httpClient: HttpClient;

  private api: string = environment.api;

  constructor(private errorSnackBar: MatSnackBar, private http :
  HttpClient, private dataService : ParsedDataService) {
    this.requiredFileType = '.xlsx,.xls,.odt';
    this.uploadProgress = 0;
  }

  ngOnInit(): void { }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.fileToUpload = fileList[0];
      this.fileName = fileList[0].name;
      this.readyToUpload = true;
    }
  }

  proccessFile() {
    this.uploadFile()
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            this.uploading = false;
            this.dataService.parseData(event.body);
          }
        },
        (error) => {
          let errorMessage = error.error.error;
          if (!errorMessage) {
            errorMessage = 'Error';
          }
          const config : MatSnackBarConfig = new MatSnackBarConfig();
          config.panelClass = ['error-snack-bar'];
          config.verticalPosition = 'top';
          return this.errorSnackBar.open(errorMessage, 'X', config);
        },
      );
  }

  private options = () => {
    let token: string = '';
    if (localStorage.getItem('token')) {
      token = String(localStorage.getItem('token'));
    }
    return {
      headers: new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/octet-stream',
      }),
    };
  };

  uploadFile(): Observable<HttpEvent<any>> {
    const endpoint = `${this.api}/sheetParser`;

    const req = new HttpRequest('POST', endpoint, this.fileToUpload, this.options());
    return this.http.request(req);
  }
}
