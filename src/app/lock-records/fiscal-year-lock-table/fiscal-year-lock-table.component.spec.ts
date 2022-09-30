import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearLockTableComponent } from './fiscal-year-lock-table.component';

describe('FiscalYearLockTableComponent', () => {
  let component: FiscalYearLockTableComponent;
  let fixture: ComponentFixture<FiscalYearLockTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiscalYearLockTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalYearLockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
