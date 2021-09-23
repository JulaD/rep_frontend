import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculosPaso1Component } from './calculos-paso1.component';

describe('CalculosPaso1Component', () => {
  let component: CalculosPaso1Component;
  let fixture: ComponentFixture<CalculosPaso1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculosPaso1Component],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculosPaso1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
