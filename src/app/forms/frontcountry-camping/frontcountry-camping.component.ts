import { Component, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormulaService, formulaResult } from 'src/app/services/formula.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivityService } from 'src/app/services/activity.service';
import { RootFormComponent } from '../root-form/root-form.component';
import { UrlService } from 'src/app/services/url.service';
import { Constants } from 'src/app/shared/utils/constants';
import { VarianceService } from 'src/app/services/variance.service';
import { WinterToggleService } from 'src/app/services/winter-toggle.service';
import { WinterCarToggleService } from 'src/app/services/winter-car-toggle.service';
import { OffSeasonToggleService } from 'src/app/services/offseason-toggle.service';
import { OffSeasonCarToggleService } from 'src/app/services/offseason-car-toggle.service';
@Component({
    selector: 'app-frontcountry-camping',
    templateUrl: './frontcountry-camping.component.html',
    styleUrls: ['./frontcountry-camping.component.scss'],
    standalone: false
})
export class FrontcountryCampingComponent extends RootFormComponent {

  public partyAttendanceTotal: formulaResult = { result: null, formula: '' };
  public partyAttendance: formulaResult = { result: null, formula: '' };
  public vehicleAttendanceTotal: formulaResult = { result: null, formula: '' };
  public partyRevenueTotal: formulaResult = { result: null, formula: '' };
  public vehicleRevenueTotal: formulaResult = { result: null, formula: '' };
  /** Net revenue for sani + electrical + shower (non-resident excluded per business rule) */
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };
  /** Net revenue for non-resident only — tracked and displayed separately */
  public nonResidentRevenueTotal: formulaResult = { result: null, formula: '' };
  public winter: boolean = false;
  public winterCar: boolean = false;
  public offSeasonCar: boolean = false;
  public offSeason: boolean = false;
  private isToggling = false;

  constructor(
    public winterToggle: WinterToggleService,
    public offSeasonToggle: OffSeasonToggleService,
    public winterCarToggle: WinterCarToggleService,
    public offSeasonCarToggle: OffSeasonCarToggleService,
  ) {
    super(
      inject(DataService),
      inject(UrlService),
      inject(ActivityService),
      inject(LoadingService),
      inject(FormulaService),
      inject(VarianceService),
      inject(Router),
    );
    // declare activity type
    this.activityType = 'Frontcountry Camping';
    this.accordionType = Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING;
    this.form = new UntypedFormGroup({
      winterCampingPartyNightsAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('winterCampingPartyNightsAttendanceStandard')] }),
      winterCampingPartyNightsAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('winterCampingPartyNightsAttendanceSocial')] }),
      offSeasonCampingPartyNightsAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('offSeasonCampingPartyNightsAttendanceStandard')] }),
      offSeasonCampingPartyNightsAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('offSeasonCampingPartyNightsAttendanceSocial')] }),
      offSeasonCampingPartyNightsAttendanceSenior: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('offSeasonCampingPartyNightsAttendanceSenior')] }),
      offSeasonCampingPartyNightsAttendanceLongStay: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('offSeasonCampingPartyNightsAttendanceLongStay')] }),
      summerCampingPartyNightsAttendanceLongStay: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('summerCampingPartyNightsAttendanceLongStay')] }),
      summerCampingPartyNightsAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('summerCampingPartyNightsAttendanceSocial')] }),
      summerCampingPartyNightsAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('summerCampingPartyNightsAttendanceStandard')] }),

      secondCarsWinterAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsWinterAttendanceSocial')] }),
      secondCarsWinterAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsWinterAttendanceStandard')] }),

      secondCarsOffSeasonAttendanceSenior: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsOffSeasonAttendanceSenior')] }),
      secondCarsOffSeasonAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsOffSeasonAttendanceSocial')] }),
      secondCarsOffSeasonAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsOffSeasonAttendanceStandard')] }),
      secondCarsOffSeasonAttendanceLongStay: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsOffSeasonAttendanceLongStay')] }),

      secondCarsSummerAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsSummerAttendanceSocial')] }),
      secondCarsSummerAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsSummerAttendanceStandard')] }),
      secondCarsSummerAttendanceLongStay: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsSummerAttendanceLongStay')] }),

      // secondCarsAttendanceSenior: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceSenior')] }),
      // secondCarsAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceSocial')] }),
      // secondCarsAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceStandard')] }),

      campingPartyNightsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('campingPartyNightsRevenueGross')] }),
      otherRevenueElectrical: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueElectrical')] }),
      otherRevenueGrossSani: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueGrossSani')] }),
      otherRevenueGrossNonResident: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueGrossNonResident')] }),
      otherRevenueShower: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueShower')] }),
      secondCarsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsRevenueGross')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.checkWinterData();
    this.checkWinterCarData();
    this.checkOffSeasonData();
    this.checkOffSeasonCarData();
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.checkWinterData();
      this.checkWinterCarData();
      this.checkOffSeasonData();
      this.checkOffSeasonCarData();
      this.calculateTotals();
    });
  }

  private checkWinterData(): void {
    if (this.isToggling) {
      return;
    }
    const winterStandard = this.form.controls['winterCampingPartyNightsAttendanceStandard'].value;
    const winterSocial = this.form.controls['winterCampingPartyNightsAttendanceSocial'].value;

    // Check if winter is toggled for frontcountry camping, persist over user sessions
    this.subscriptions.add(
      this.winterToggle.getWinterToggle.subscribe((value) => {
        this.winter = value;
      })
    );

    // Only set winter to true if there's data, then set true for the session
    if (winterStandard || winterSocial) {
      this.winter = true;
      this.winterToggle.setWinterToggle(this.winter)
    }
    this.isToggling = false;
  }

  private checkOffSeasonData(): void {
    if (this.isToggling) {
      return;
    }
    const offSeasonStandard = this.form.controls['offSeasonCampingPartyNightsAttendanceStandard'].value;
    const offSeasonSocial = this.form.controls['offSeasonCampingPartyNightsAttendanceSocial'].value;

    // Check if off-season is toggled for frontcountry camping, persist over user sessions
    this.subscriptions.add(
      this.offSeasonToggle.getOffSeasonToggle.subscribe((value) => {
        this.offSeason = value;
      })
    );

    // Only set off-season to true if there's data, then set true for the session
    if (offSeasonStandard || offSeasonSocial) {
      this.offSeason = true;
      this.offSeasonToggle.setOffSeasonToggle(this.offSeason)
    }
    this.isToggling = false;
  }

  private checkWinterCarData(): void {
    if (this.isToggling) {
      return;
    }
    const winterCarStandard = this.form.controls['secondCarsWinterAttendanceStandard'].value;
    const winterCarSocial = this.form.controls['secondCarsWinterAttendanceSocial'].value;

    // Check if winter is toggled for frontcountry camping, persist over user sessions
    this.subscriptions.add(
      this.winterCarToggle.getWinterCarToggle.subscribe((value) => {
        this.winter = value;
      })
    );

    // Only set winter to true if there's data, then set true for the session
    if (winterCarStandard || winterCarSocial) {
      this.winterCar = true;
      this.winterCarToggle.setWinterCarToggle(this.winterCar)
    }
    this.isToggling = false;
  }

  private checkOffSeasonCarData(): void {
    if (this.isToggling) {
      return;
    }
    const offSeasonCarStandard = this.form.controls['secondCarsOffSeasonAttendanceStandard'].value;
    const offSeasonCarSenior = this.form.controls['secondCarsOffSeasonAttendanceSenior'].value;
    const offSeasonCarSocial = this.form.controls['secondCarsOffSeasonAttendanceSocial'].value;
    const offSeasonCarLongStay = this.form.controls['secondCarsOffSeasonAttendanceLongStay'].value;

    // Check if off-season is toggled for frontcountry camping, persist over user sessions
    this.subscriptions.add(
      this.offSeasonCarToggle.getOffSeasonCarToggle.subscribe((value) => {
        this.offSeasonCar = value;
      })
    );

    // Only set off-season car to true if there's data, then set true for the session
    if (offSeasonCarStandard || offSeasonCarSocial || offSeasonCarLongStay || offSeasonCarSenior) {
      this.offSeasonCar = true;
      this.offSeasonCarToggle.setOffSeasonCarToggle(this.offSeasonCar)
    }
    this.isToggling = false;
  }

  calculateTotals() {
    this.partyAttendance =
      this.formulaService.frontcountryCampingPartyAttendance(
        [
          this.form.controls['winterCampingPartyNightsAttendanceStandard'].value,
          this.form.controls['winterCampingPartyNightsAttendanceSocial'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceStandard'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceSocial'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceSenior'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceLongStay'].value,
          this.form.controls['summerCampingPartyNightsAttendanceStandard'].value,
          this.form.controls['summerCampingPartyNightsAttendanceSocial'].value,
          this.form.controls['summerCampingPartyNightsAttendanceLongStay'].value
        ]
      );
    this.partyAttendanceTotal =
      this.formulaService.frontcountryCampingPartyAttendance(
        [
          this.form.controls['winterCampingPartyNightsAttendanceStandard'].value,
          this.form.controls['winterCampingPartyNightsAttendanceSocial'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceStandard'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceSocial'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceSenior'].value,
          this.form.controls['offSeasonCampingPartyNightsAttendanceLongStay'].value,
          this.form.controls['summerCampingPartyNightsAttendanceStandard'].value,
          this.form.controls['summerCampingPartyNightsAttendanceSocial'].value,
          this.form.controls['summerCampingPartyNightsAttendanceLongStay'].value
        ],
        this.data?.config?.attendanceModifier
      );
    this.vehicleAttendanceTotal =
      this.formulaService.frontcountryCampingSecondCarAttendance([
        this.form.controls['secondCarsWinterAttendanceStandard'].value,
        this.form.controls['secondCarsWinterAttendanceSocial'].value,
        this.form.controls['secondCarsOffSeasonAttendanceSenior'].value,
        this.form.controls['secondCarsOffSeasonAttendanceSocial'].value,
        this.form.controls['secondCarsOffSeasonAttendanceStandard'].value,
        this.form.controls['secondCarsOffSeasonAttendanceLongStay'].value,
        this.form.controls['secondCarsSummerAttendanceSocial'].value,
        this.form.controls['secondCarsSummerAttendanceStandard'].value,
        this.form.controls['secondCarsSummerAttendanceLongStay'].value
      ]);
    this.partyRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['campingPartyNightsRevenueGross'].value
    ]);
    this.vehicleRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['secondCarsRevenueGross'].value
    ]);
    this.otherRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['otherRevenueGrossSani'].value,
      this.form.controls['otherRevenueElectrical'].value,
      // Note: otherRevenueGrossNonResident is intentionally excluded — tracked separately below
      this.form.controls['otherRevenueShower'].value
    ]);
    // NET REVENUE is calculated and displayed independently
    this.nonResidentRevenueTotal = this.formulaService.nonResidentNetRevenue([
      this.form.controls['otherRevenueGrossNonResident'].value
    ]);
  }

  onWinterToggle() {
    this.isToggling = true;
    this.winter = !this.winter;
    this.winterToggle.setWinterToggle(this.winter);
  }

  onWinterCarToggle() {
    this.isToggling = true;
    this.winterCar = !this.winterCar;
    this.winterCarToggle.setWinterCarToggle(this.winterCar);
  }

  onOffSeasonToggle() {
    this.isToggling = true;
    this.offSeason = !this.offSeason;
    this.offSeasonToggle.setOffSeasonToggle(this.offSeason);
  }

  onOffSeasonCarToggle() {
    this.isToggling = true;
    this.offSeasonCar = !this.offSeasonCar;
    this.offSeasonCarToggle.setOffSeasonCarToggle(this.offSeasonCar);
  }

  async onSubmit() {
    await this.submit(true);
  }
}
