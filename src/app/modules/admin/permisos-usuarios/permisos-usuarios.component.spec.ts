import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosUsuariosComponent } from './permisos-usuarios.component';

describe('PermisosUsuariosComponent', () => {
  let component: PermisosUsuariosComponent;
  let fixture: ComponentFixture<PermisosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
