import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculosPaso1Component } from '../calculos-paso1/calculos-paso1.component';
import { CalculosPaso2Component } from '../calculos-paso2/calculos-paso2.component';
import { CalculosPaso3Component } from '../calculos-paso3/calculos-paso3.component';
import { CalculosPaso4Component } from '../calculos-paso4/calculos-paso4.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  isLinear = false;

  @ViewChild(CalculosPaso1Component)
  private step1Access: CalculosPaso1Component

  @ViewChild(CalculosPaso2Component)
  private step2Access: CalculosPaso2Component

  @ViewChild(CalculosPaso3Component)
  private step3Access: CalculosPaso3Component

  @ViewChild(CalculosPaso4Component)
  private step4Access: CalculosPaso4Component

  ngOnInit() { }

  ngAfterViewInit() {
    this.ParentTestMethod()
  }

  ParentTestMethod() {
    this.step2Access.testMethod();
  }
}
