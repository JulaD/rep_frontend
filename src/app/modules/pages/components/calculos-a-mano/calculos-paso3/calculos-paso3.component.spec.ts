import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculosPaso3Component } from './calculos-paso3.component';

describe('CalculosPaso3Component', () => {
  let component: CalculosPaso3Component;
  let fixture: ComponentFixture<CalculosPaso3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculosPaso3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculosPaso3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
