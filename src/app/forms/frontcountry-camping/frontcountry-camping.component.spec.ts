import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ParkHeaderModule } from '../park-header/park-header.module';

import { FrontcountryCampingComponent } from './frontcountry-camping.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('FrontcountryCampingComponent', () => {
  let component: FrontcountryCampingComponent;
  let fixture: ComponentFixture<FrontcountryCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontcountryCampingComponent],
      imports: [
        RouterTestingModule,
        ParkHeaderModule,
      ],
      providers: [HttpClient, HttpHandler, ConfigService, BsModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcountryCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have otherRevenueGrossNonResident control in the form', () => {
    expect(component.form.contains('otherRevenueGrossNonResident')).toBeTrue();
  });

  it('should expose nonResidentRevenueTotal separately from otherRevenueTotal', () => {
    expect(component.nonResidentRevenueTotal).toBeDefined();
    expect(component.otherRevenueTotal).toBeDefined();
  });

  it('should calculate nonResidentRevenueTotal independently from sani/electrical/shower', () => {
    component.form.patchValue({
      otherRevenueGrossSani: 100,
      otherRevenueElectrical: 200,
      otherRevenueShower: 50,
      otherRevenueGrossNonResident: 750,
    });
    component.calculateTotals();

    // nonResidentRevenueTotal should only reflect the non-resident value and use gross x 1.05
    expect(component.nonResidentRevenueTotal.result).toBe('$787.50');
    expect(component.nonResidentRevenueTotal.formula).toContain('x 1.05');

    // otherRevenueTotal must NOT include non-resident (result should be based on sani+electrical+shower=350 gross, not 1100)
    expect(component.otherRevenueTotal.result).toBeDefined();
    expect(component.otherRevenueTotal.result).not.toBeNull();

    // The two totals should be different values
    expect(component.otherRevenueTotal.result).not.toEqual(component.nonResidentRevenueTotal.result);
  });

  it('should handle null otherRevenueGrossNonResident (backward compatibility)', () => {
    component.form.patchValue({
      otherRevenueGrossSani: 100,
      otherRevenueElectrical: 200,
      otherRevenueShower: 50,
      otherRevenueGrossNonResident: null,
    });
    component.calculateTotals();

    // otherRevenueTotal should still calculate correctly without non-resident
    expect(component.otherRevenueTotal.result).toBeDefined();
    // nonResidentRevenueTotal should return null result when value is null
    expect(component.nonResidentRevenueTotal.result).toBeNull();
  });

  it('should apply variance field invalidator to otherRevenueGrossNonResident', () => {
    const ctrl = component.form.get('otherRevenueGrossNonResident');
    expect(ctrl).toBeTruthy();
    // min(0) validator — negative value should be invalid
    ctrl!.setValue(-1);
    expect(ctrl!.valid).toBeFalse();
    ctrl!.setValue(0);
    expect(ctrl!.valid).toBeTrue();
    ctrl!.setValue(500);
    expect(ctrl!.valid).toBeTrue();
  });
});
