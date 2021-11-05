import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import CalculatorResponse from '../interfaces/CalculatorResponseDTO';
import { AgeGroupJSON } from './rest/rest.service';
import ExtraData from '../interfaces/ExtraDataDTO';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private dummy: {
    resp: CalculatorResponse,
    popData: AgeGroupJSON[],
    extraData: ExtraData
  };

  private result: BehaviorSubject<{
    resp: CalculatorResponse,
    popData: AgeGroupJSON[],
    extraData: ExtraData
  }>;

  // The $ is observable nomenclature
  public result$;

  constructor() {
    this.result = new BehaviorSubject<{
      resp: CalculatorResponse,
      popData: AgeGroupJSON[],
      extraData: ExtraData
    }>(this.dummy);
    this.result$ = this.result.asObservable();
  }

  setData(resp: CalculatorResponse, popData: AgeGroupJSON[], extraData: ExtraData): void {
    this.result.next({ resp, popData, extraData });
  }
}
