import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationDisplayComponent } from './calculation-display.component';

describe('CalculationDisplayComponent', () => {
  let component: CalculationDisplayComponent;
  let fixture: ComponentFixture<CalculationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
