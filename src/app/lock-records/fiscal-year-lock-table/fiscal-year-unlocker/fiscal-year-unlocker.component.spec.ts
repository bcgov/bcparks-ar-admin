import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigService } from 'src/app/services/config.service';

import { FiscalYearUnlockerComponent } from './fiscal-year-unlocker.component';

describe('FiscalYearUnlockerComponent', () => {
  let component: FiscalYearUnlockerComponent;
  let fixture: ComponentFixture<FiscalYearUnlockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FiscalYearUnlockerComponent],
      providers: [ConfigService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalYearUnlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
