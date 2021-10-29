import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqFormComponent } from './faq-form.component';

describe('FaqFormComponent', () => {
  let component: FaqFormComponent;
  let fixture: ComponentFixture<FaqFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqFormComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
