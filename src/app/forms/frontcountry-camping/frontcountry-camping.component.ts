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
import { OffSeasonToggleService } from 'src/app/services/offseason-toggle.service';
@Component({
    selector: 'app-frontcountry-camping',
    templateUrl: './frontcountry-camping.component.html',
    styleUrls: ['./frontcountry-camping.component.scss'],
    standalone: false
})
export class FrontcountryCampingComponent extends RootFormComponent {

  public partyAttendanceTotal: formulaResult = { result: null, formula: '' };
  public vehicleAttendanceTotal: formulaResult = { result: null, formula: '' };
  public partyRevenueTotal: formulaResult = { result: null, formula: '' };
  public vehicleRevenueTotal: formulaResult = { result: null, formula: '' };
  /** Net revenue for sani + electrical + shower (non-resident excluded per business rule) */
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };
  /** Net revenue for non-resident only — tracked and displayed separately */
  public nonResidentRevenueTotal: formulaResult = { result: null, formula: '' };
  public winter: boolean = false;
  public offSeason: boolean = false;
  private isToggling = false;

  constructor(
    public winterToggle: WinterToggleService,
    public offSeasonToggle: OffSeasonToggleService
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
      secondCarsAttendanceSenior: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceSenior')] }),
      secondCarsAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceSocial')] }),
      secondCarsAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceStandard')] }),
      campingPartyNightsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('campingPartyNightsRevenueGross')] }),
      otherRevenueElectrical: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueElectrical')] }),
      otherRevenueGrossSani: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueGrossSani')] }),
      otherRevenueGrossNonResident: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueGrossNonResident')] }),
      otherRevenueShower: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueShower')] }),
      secondCarsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsRevenueGross')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.checkWinterData();
    this.checkOffSeasonData();
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.checkWinterData();
      this.checkOffSeasonData();
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

  calculateTotals() {
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
        this.form.controls['secondCarsAttendanceStandard'].value,
        this.form.controls['secondCarsAttendanceSenior'].value,
        this.form.controls['secondCarsAttendanceSocial'].value
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

  onOffSeasonToggle() {
    this.isToggling = true;
    this.offSeason = !this.offSeason;
    this.offSeasonToggle.setOffSeasonToggle(this.offSeason);
  }

  async onSubmit() {
    await this.submit(true);
  }
}
