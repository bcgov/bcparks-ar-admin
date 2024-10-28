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

@Component({
  selector: 'app-day-use',
  templateUrl: './day-use.component.html',
  styleUrls: ['./day-use.component.scss'],
})
export class DayUseComponent extends RootFormComponent {

  public picnicRevenueTotal: formulaResult = { result: null, formula: '' };
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };

  constructor() {
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
    this.activityType = 'Day Use';
    this.accordionType = Constants.dataIds.ACCORDION_DAY_USE;
    this.form = new UntypedFormGroup({
      otherDayUsePeopleHotSprings: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherDayUsePeopleHotSprings')] }),
      peopleAndVehiclesBus: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleAndVehiclesBus')] }),
      peopleAndVehiclesTrail: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleAndVehiclesTrail')] }),
      peopleAndVehiclesVehicle: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleAndVehiclesVehicle')] }),
      picnicShelterPeople: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('picnicShelterPeople')] }),
      otherDayUseRevenueHotSprings: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherDayUseRevenueHotSprings')] }),
      picnicRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('picnicRevenueGross')] }),
      picnicRevenueShelter: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('picnicRevenueShelter')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.dayUseVehicleAttendance(
      [this.form.controls['peopleAndVehiclesTrail'].value],
      [this.form.controls['peopleAndVehiclesVehicle'].value],
      [this.form.controls['peopleAndVehiclesBus'].value],
      this.data?.config?.attendanceVehiclesModifier,
      this.data?.config?.attendanceBusModifier
    );
    this.picnicRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['picnicRevenueGross'].value
    ]);
    this.otherRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['otherDayUseRevenueHotSprings'].value
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }

}