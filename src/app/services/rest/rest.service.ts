import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import { environment } from 'src/environments/environment';

export interface AgeGroupJSON {
  age: string;
  sex: string;
  medianWeight: number;
  population: number;
}

const api: string = environment.api;
const endpoint = `${api}`;
const serviceCalc = '/repCalculator';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  addCalculation(groups: AgeGroupJSON[], extraData: ExtraData): Observable<any> {
    return this.http.post(endpoint + serviceCalc, {groups: groups, extraData: extraData}).pipe(
      catchError(this.handleError)
    );
  }

  // BORRAR ESTO DESPUES!!!
  // https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
  requestDefaultWeights(): Observable<any> {
    console.log("Llame a requestDefaultWeights()")
    return this.http.post<any>(endpoint + serviceWeights,{}).pipe(
      catchError(this.handleError)
    );
  }

  processDefaultWeights() {
    console.log("Llame a processDefaultWeights()")
    this.requestDefaultWeights()
      .subscribe((event) => {
        
        console.log(event.body)
        }
      )
  }

  private handleError(error: HttpErrorResponse): any {
    console.log("Llame a handleError(...)")
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

