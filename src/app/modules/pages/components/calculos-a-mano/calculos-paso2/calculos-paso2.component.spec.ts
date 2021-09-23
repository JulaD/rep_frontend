import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculosPaso2Component } from './calculos-paso2.component';

describe('CalculosPaso2Component', () => {
  let component: CalculosPaso2Component;
  let fixture: ComponentFixture<CalculosPaso2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculosPaso2Component],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculosPaso2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
