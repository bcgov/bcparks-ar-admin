import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ParkHeaderModule } from '../park-header/park-header.module';

import { BoatingComponent } from './boating.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('BoatingComponent', () => {
  let component: BoatingComponent;
  let fixture: ComponentFixture<BoatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoatingComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ParkHeaderModule,
      ],
      providers: [HttpClient, HttpHandler, ConfigService, BsModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have otherRevenueGrossNonResident control in the form', () => {
    expect(component.form.contains('otherRevenueGrossNonResident')).toBeTrue();
  });

  it('should calculate nonResidentRevenueTotal from non-resident gross revenue', () => {
    component.form.patchValue({
      boatRevenueGross: 100,
      otherRevenueGrossNonResident: 750,
    });
    component.calculateTotals();

    expect(component.nonResidentRevenueTotal.result).toBe('$712.50');
    expect(component.nonResidentRevenueTotal.formula).toContain('5% GST');
  });

  it('should handle null otherRevenueGrossNonResident', () => {
    component.form.patchValue({
      otherRevenueGrossNonResident: null,
    });
    component.calculateTotals();

    expect(component.nonResidentRevenueTotal.result).toBeNull();
  });
});
