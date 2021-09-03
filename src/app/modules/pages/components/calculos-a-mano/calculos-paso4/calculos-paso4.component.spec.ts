import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculosPaso4Component } from './calculos-paso4.component';

describe('CalculosPaso4Component', () => {
  let component: CalculosPaso4Component;
  let fixture: ComponentFixture<CalculosPaso4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculosPaso4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculosPaso4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
