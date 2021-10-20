import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import { environment } from 'src/environments/environment';
import DefaultWeightDTO from 'src/app/interfaces/DefaultWeightDTO';

export interface AgeGroupJSON {
  age: string;
  sex: string;
  medianWeight: number;
  population: number;
}

const { api } = environment;
const endpoint = `${api}`;
const serviceCalc = '/repCalculator';
const serviceWeights = '/parameters/weights'
const serviceExtraData = '/parameters/extraData'

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) { }

  addCalculation(groups: AgeGroupJSON[], extraData: ExtraData): Observable<any> {
    return this.http.post(endpoint + serviceCalc, { groups, extraData }).pipe(
      catchError(this.handleError),
    );
  }

  getDefaultWeights(): Observable<any> {
    return this.http.get<any>(endpoint + serviceWeights);
  }

  getDefaultExtraData(): Observable<any> {
    return this.http.get<any>(endpoint + serviceExtraData);
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
