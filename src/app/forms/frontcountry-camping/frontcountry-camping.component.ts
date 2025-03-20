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
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };
  public winter: boolean = false;

  constructor(
    public winterToggle: WinterToggleService
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
      campingPartyNightsAttendanceLongStay: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('campingPartyNightsAttendanceLongStay')] }),
      campingPartyNightsAttendanceSenior: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('campingPartyNightsAttendanceSenior')] }),
      campingPartyNightsAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('campingPartyNightsAttendanceSocial')] }),
      campingPartyNightsAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('campingPartyNightsAttendanceStandard')] }),
      secondCarsAttendanceSenior: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceSenior')] }),
      secondCarsAttendanceSocial: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceSocial')] }),
      secondCarsAttendanceStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsAttendanceStandard')] }),
      campingPartyNightsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('campingPartyNightsRevenueGross')] }),
      otherRevenueElectrical: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueElectrical')] }),
      otherRevenueGrossSani: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueGrossSani')] }),
      otherRevenueShower: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueShower')] }),
      secondCarsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('secondCarsRevenueGross')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.checkWinterData();
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.checkWinterData();
      this.calculateTotals();
    });
  }

  private checkWinterData(): void {
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
  }

  calculateTotals() {
    this.partyAttendanceTotal =
      this.formulaService.frontcountryCampingPartyAttendance(
        [
          this.form.controls['winterCampingPartyNightsAttendanceStandard'].value,
          this.form.controls['winterCampingPartyNightsAttendanceSocial'].value,
          this.form.controls['campingPartyNightsAttendanceStandard'].value,
          this.form.controls['campingPartyNightsAttendanceSenior'].value,
          this.form.controls['campingPartyNightsAttendanceSocial'].value,
          this.form.controls['campingPartyNightsAttendanceLongStay'].value
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
      this.form.controls['otherRevenueShower'].value
    ]);
  }

  onWinterToggle() {
    this.winter = !this.winter
    this.winterToggle.setWinterToggle(this.winter);
  }

  async onSubmit() {
    await this.submit(true);
  }
}
