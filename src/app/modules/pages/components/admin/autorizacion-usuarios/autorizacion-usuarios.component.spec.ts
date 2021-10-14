import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionUsuariosComponent } from './autorizacion-usuarios.component';

describe('AutorizacionUsuariosComponent', () => {
  let component: AutorizacionUsuariosComponent;
  let fixture: ComponentFixture<AutorizacionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutorizacionUsuariosComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
