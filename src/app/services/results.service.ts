import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FranjaEtaria } from '../enums/FranjaEtaria';
import { CalculatorResponseDTO } from '../interfaces/CalculatorResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private dummy: CalculatorResponseDTO;
  private result: BehaviorSubject<CalculatorResponseDTO>;
  // The $ is observable nomenclature
  public result$;

  constructor() {
    this.result = new BehaviorSubject<CalculatorResponseDTO>(this.dummy);
    this.result$ = this.result.asObservable();
  }
  
  setData(result: CalculatorResponseDTO): void {
    this.result.next(result);
  }
}
