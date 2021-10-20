import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import CalculatorResponse from '../interfaces/CalculatorResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private dummy: CalculatorResponse;
  private result: BehaviorSubject<CalculatorResponse>;
  // The $ is observable nomenclature
  public result$;

  constructor() {
    this.result = new BehaviorSubject<CalculatorResponse>(this.dummy);
    this.result$ = this.result.asObservable();
  }
  
  setData(result: CalculatorResponse): void {
    this.result.next(result);
  }
}
