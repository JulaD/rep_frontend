import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, last, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css']
})
export class UploadTemplateComponent implements OnInit {

  //Archivo
  @Input()
  requiredFileType: string = '.xls';
  
  fileName: string = '';
  fileToUpload:     File;

  //Progreso
  uploadProgress: number;
  uploading: boolean;
  readyToUpload:  boolean = false;
  
  //Error carga archivo
  error:        boolean = false;
  errorMessage: string = '';

  //Request
  headers: Headers = new Headers();
  httpClient: HttpClient;
  
  constructor(private http : HttpClient) {    
    this.requiredFileType = '.xlsx,.xls,.odt';
    this.uploadProgress   = 0;
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("fileList");
      this.fileToUpload   = fileList[0];
      this.fileName       = fileList[0].name;
      this.readyToUpload  = true;
    }
  }

  proccessFile() {
    console.log("proccessFile");
    this.uploadFile()
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      )
      .subscribe(
        event => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.uploading = true;
              break;
            case HttpEventType.UploadProgress:
              // Computa y despliega el % subido:
              this.uploadProgress = Math.round(100 * event.loaded / (event.total ?? 0));
              break;
            case HttpEventType.Response:
              this.uploading = false;
              break;
          }
        },
        (err) => {
          this.error        = true;
          this.errorMessage = err;
        }
      )
  }
  
  uploadFile(): Observable<HttpEvent<any>> {
    console.log("uploadFile, sending req");

    const endpoint = 'http://localhost:8000/sheetParser';
    let reqHeaders            = new HttpHeaders({
      'Content-Type':  'application/octet-stream',
    })

    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', endpoint, this.fileToUpload, {headers: reqHeaders});
    return this.http.request(req);
  }

  getEventMessage(event: HttpEvent<unknown>) {
    switch (event.type) {
      case HttpEventType.Sent:
        this.uploading = true;
        break;
      case HttpEventType.UploadProgress:
        // Computa y despliega el % subido:
        this.uploadProgress = Math.round(100 * event.loaded / (event.total ?? 0));
        break;
      case HttpEventType.Response:
        this.uploading = false;
        console.log(event.body);
        break;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}

