import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionValoresComponent } from './configuracion-valores.component';

describe('ConfiguracionValoresComponent', () => {
  let component: ConfiguracionValoresComponent;
  let fixture: ComponentFixture<ConfiguracionValoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionValoresComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
