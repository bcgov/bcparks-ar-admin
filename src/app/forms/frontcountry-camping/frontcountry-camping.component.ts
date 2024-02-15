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
@Component({
  selector: 'app-frontcountry-camping',
  templateUrl: './frontcountry-camping.component.html',
  styleUrls: ['./frontcountry-camping.component.scss'],
})
export class FrontcountryCampingComponent extends RootFormComponent {

  public partyAttendanceTotal: formulaResult = { result: null, formula: '' };
  public vehicleAttendanceTotal: formulaResult = { result: null, formula: '' };
  public partyRevenueTotal: formulaResult = { result: null, formula: '' };
  public vehicleRevenueTotal: formulaResult = { result: null, formula: '' };
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };

  constructor() {
    super(
      inject(DataService),
      inject(UrlService),
      inject(ActivityService),
      inject(LoadingService),
      inject(FormulaService),
      inject(Router),
    );
    // declare activity type
    this.activityType = 'Frontcountry Camping';
    this.accordionType = Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING;
    this.form = new UntypedFormGroup({
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
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(100)] }),
    });
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.calculateTotals();
    })
  }

  calculateTotals() {
    this.partyAttendanceTotal =
      this.formulaService.frontcountryCampingPartyAttendance(
        [
          this.form.controls['campingPartyNightsAttendanceStandard'].value,
          this.form.controls['campingPartyNightsAttendanceSenior'].value,
          this.form.controls['campingPartyNightsAttendanceSocial'].value,
          this.form.controls['campingPartyNightsAttendanceLongStay'].value,
        ],
        this.data?.config?.attendanceModifier
      );
    this.vehicleAttendanceTotal =
      this.formulaService.frontcountryCampingSecondCarAttendance([
        this.form.controls['secondCarsAttendanceStandard'].value,
        this.form.controls['secondCarsAttendanceSenior'].value,
        this.form.controls['secondCarsAttendanceSocial'].value,
      ]);
    this.partyRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['campingPartyNightsRevenueGross'].value,
    ]);
    this.vehicleRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['secondCarsRevenueGross'].value,
    ]);
    this.otherRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['otherRevenueGrossSani'].value,
      this.form.controls['otherRevenueElectrical'].value,
      this.form.controls['otherRevenueShower'].value,
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }
}