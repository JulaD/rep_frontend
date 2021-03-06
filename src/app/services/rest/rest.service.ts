import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import { environment } from 'src/environments/environment';

export interface AgeGroupJSON {
  age: string;
  sex: string;
  medianWeight: number;
  population: number;
}

const { api } = environment;
const endpoint = `${api}`;
const serviceCalc = '/repCalculator';
const serviceWeights = '/parameters/weights';
const serviceExtraData = '/parameters/extraData';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) { }

  private options = () => {
    let token: string = '';
    if (localStorage.getItem('token')) {
      token = String(localStorage.getItem('token'));
    }
    return {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };
  };

  addCalculation(groups: AgeGroupJSON[], extraData: ExtraData, fromTemplate: boolean):
  Observable<any> {
    return this.http.post(
      endpoint + serviceCalc, { groups, extraData, fromTemplate }, this.options(),
    ).pipe(
      catchError(this.handleError),
    );
  }

  getDefaultWeights(): Observable<any> {
    return this.http.get<any>(endpoint + serviceWeights, this.options()).pipe(
      catchError(this.handleError),
    );
  }

  getDefaultExtraData(): Observable<any> {
    return this.http.get<any>(endpoint + serviceExtraData, this.options()).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, `
        + `body was: ${error.error}`,
      );
    }
    return throwError(
      'Something bad happened; please try again later.',
    );
  }
}
