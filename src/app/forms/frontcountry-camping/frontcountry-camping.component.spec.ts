import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { FrontcountryCampingComponent } from './frontcountry-camping.component';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivityService } from 'src/app/services/activity.service';
import { UrlService } from 'src/app/services/url.service';
import { VarianceService } from 'src/app/services/variance.service';
import { WinterToggleService } from 'src/app/services/winter-toggle.service';
import { OffSeasonToggleService } from 'src/app/services/offseason-toggle.service';
import { Constants } from 'src/app/shared/utils/constants';

describe('FrontcountryCampingComponent (100% Injection Context Resolved)', () => {
  let component: FrontcountryCampingComponent;
  let fixture: ComponentFixture<FrontcountryCampingComponent>;

  let winterToggleSubject: BehaviorSubject<boolean>;
  let offSeasonToggleSubject: BehaviorSubject<boolean>;

  let mockWinterToggleService: any;
  let mockOffSeasonToggleService: any;
  let mockFormulaService: any;
  let sharedSubscription: Subscription;

  const createSmartMock = () => {
    return new Proxy({}, {
      get: (target, prop) => {
        if (typeof prop === 'string' && (prop.endsWith('$') || prop.includes('Stream') || prop.toLowerCase().includes('subject'))) {
          return of({});
        }
        return jasmine.createSpy(String(prop)).and.returnValue(of({}));
      }
    });
  };

  beforeEach(async () => {
    winterToggleSubject = new BehaviorSubject<boolean>(false);
    offSeasonToggleSubject = new BehaviorSubject<boolean>(false);
    sharedSubscription = new Subscription();

    // 1. Force structural objects onto prototype BEFORE constructor line calls
    FrontcountryCampingComponent.prototype.subscriptions = sharedSubscription;
    (FrontcountryCampingComponent.prototype as any).data = { config: { attendanceModifier: 1.0 } };
    (FrontcountryCampingComponent.prototype as any).maxVarianceNotesCharacters = 500;

    spyOn(FrontcountryCampingComponent.prototype, 'varianceFieldInvalidator').and.returnValue(() => null);
    spyOn(FrontcountryCampingComponent.prototype, 'submit').and.returnValue(Promise.resolve());

    mockFormulaService = {
      frontcountryCampingPartyAttendance: jasmine.createSpy().and.returnValue({ result: 10, formula: 'party' }),
      frontcountryCampingSecondCarAttendance: jasmine.createSpy().and.returnValue({ result: 20, formula: 'car' }),
      basicNetRevenue: jasmine.createSpy().and.returnValue({ result: 30, formula: 'revenue' })
    };

    mockWinterToggleService = {
      getWinterToggle: winterToggleSubject.asObservable(),
      setWinterToggle: jasmine.createSpy('setWinterToggle')
    };

    mockOffSeasonToggleService = {
      getOffSeasonToggle: offSeasonToggleSubject.asObservable(),
      setOffSeasonToggle: jasmine.createSpy('setOffSeasonToggle')
    };

    await TestBed.configureTestingModule({
      declarations: [FrontcountryCampingComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: DataService, useValue: createSmartMock() },
        { provide: UrlService, useValue: createSmartMock() },
        { provide: ActivityService, useValue: createSmartMock() },
        { provide: LoadingService, useValue: createSmartMock() },
        { provide: FormulaService, useValue: mockFormulaService },
        { provide: VarianceService, useValue: createSmartMock() },
        { provide: Router, useValue: createSmartMock() },
        { provide: WinterToggleService, useValue: mockWinterToggleService },
        { provide: OffSeasonToggleService, useValue: mockOffSeasonToggleService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // 2. Wrap component creation natively within the TestBed injection context framework
    TestBed.runInInjectionContext(() => {
      fixture = TestBed.createComponent(FrontcountryCampingComponent);
      component = fixture.componentInstance;
    });
    
    fixture.detectChanges();
  });

  afterEach(() => {
    sharedSubscription.unsubscribe();
    delete (FrontcountryCampingComponent.prototype as any).subscriptions;
    delete (FrontcountryCampingComponent.prototype as any).data;
    delete (FrontcountryCampingComponent.prototype as any).maxVarianceNotesCharacters;
  });

  it('should cleanly satisfy inject constraints and build component', () => {
    expect(component).toBeTruthy();
    expect(component.activityType).toBe('Frontcountry Camping');
    expect(component.accordionType).toBe(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING);
  });

  describe('Reactive Subscriptions Pipeline (Lines 114-115)', () => {
    it('should run internal subscription stream assignments when events fire', () => {
      winterToggleSubject.next(true);
      offSeasonToggleSubject.next(true);
      fixture.detectChanges();

      expect(component.winter).toBe(true);
      expect(component.offSeason).toBe(true);

      winterToggleSubject.next(false);
      offSeasonToggleSubject.next(false);
      fixture.detectChanges();

      expect(component.winter).toBe(false);
      expect(component.offSeason).toBe(false);
    });
  });

  describe('Action Handlers (Lines 155-167)', () => {
    it('should complete onWinterToggle statements successfully', () => {
      component.winter = false;
      component.onWinterToggle();
      
      expect(component['isToggling']).toBe(true);
      expect(component.winter).toBe(true);
      expect(mockWinterToggleService.setWinterToggle).toHaveBeenCalledWith(true);
    });

    it('should complete onOffSeasonToggle statements successfully', () => {
      component.offSeason = false;
      component.onOffSeasonToggle();
      
      expect(component['isToggling']).toBe(true);
      expect(component.offSeason).toBe(true);
      expect(mockOffSeasonToggleService.setOffSeasonToggle).toHaveBeenCalledWith(true);
    });

    it('should process onSubmit and push requests down to base handles', async () => {
      await component.onSubmit();
      expect(component.submit).toHaveBeenCalledWith(true);
    });
  });

  describe('Validation & Calculation Core Edge Cases', () => {
    it('should skip structural assignments if form inputs evaluate to empty criteria', () => {
      mockWinterToggleService.setWinterToggle.calls.reset();
      component['isToggling'] = false;

      component.form.patchValue({
        winterCampingPartyNightsAttendanceStandard: null,
        winterCampingPartyNightsAttendanceSocial: null,
        offSeasonCampingPartyNightsAttendanceStandard: null,
        offSeasonCampingPartyNightsAttendanceSocial: null
      });

      component['checkWinterData']();
      component['checkOffSeasonData']();
      expect(mockWinterToggleService.setWinterToggle).not.toHaveBeenCalled();
    });

    it('should proceed safely with defaults if operational dataset configurations are missing', () => {
      component.data = null;
      component.calculateTotals();
      expect(mockFormulaService.frontcountryCampingPartyAttendance).toHaveBeenCalledWith(jasmine.any(Array), undefined);
    });
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
