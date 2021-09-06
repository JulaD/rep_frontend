import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByHandComponent } from './by-hand.component';

describe('ByHandComponent', () => {
  let component: ByHandComponent;
  let fixture: ComponentFixture<ByHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByHandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
