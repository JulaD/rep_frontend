import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css'],
})
export class UploadTemplateComponent implements OnInit {
  // Archivo
  requiredFileType: string;

  fileName: string = '';

  fileToUpload: File;

  // Progreso
  uploadProgress: number;

  uploadSub: Subscription;

  readyToUpload: boolean = false;

  // Error carga archivo
  error: boolean = false;

  errorMessage: string = '';

  // Request
  headers: Headers = new Headers();

  constructor() { // private _http: HttpClient) {
    this.requiredFileType = '.xlsx';
    this.fileName = '';
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList[0]) {
      this.fileToUpload = fileList[0];
      this.fileName = this.fileToUpload.name;
      this.readyToUpload = true;
    }
  }

  /* proccessFile(file: File) {//: Observable<Response> {
      let headers = new HttpHeaders({
        'Content-Type':  'application/octet-stream',
      })
     /*return this._http.post<File>('Renzo', file, {headers})
        .pipe(
          catchError(this.handleError())
        );
  } */

  handleError(): (err: any, caught: Observable<File>) => import('rxjs').ObservableInput<any> {
    throw new Error('Method not implemented.');
  }

  /* private handleError(error: HttpErrorResponse) {
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
  } */
}
