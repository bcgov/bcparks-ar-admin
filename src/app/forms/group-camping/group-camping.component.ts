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
  selector: 'app-group-camping',
  templateUrl: './group-camping.component.html',
  styleUrls: ['./group-camping.component.scss'],
})
export class GroupCampingComponent extends RootFormComponent {

  public standardRevenueTotal: formulaResult = { result: null, formula: '' };
  public youthRevenueTotal: formulaResult = { result: null, formula: '' };

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
    this.activityType = 'Group Camping';
    this.accordionType = Constants.dataIds.ACCORDION_GROUP_CAMPING;
    this.form = new UntypedFormGroup({
      standardRateGroupsTotalPeopleAdults: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('standardRateGroupsTotalPeopleAdults')] }),
      standardRateGroupsTotalPeopleKids: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('standardRateGroupsTotalPeopleKids')] }),
      standardRateGroupsTotalPeopleStandard: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('standardRateGroupsTotalPeopleStandard')] }),
      standardRateGroupsTotalPeopleYouth: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('standardRateGroupsTotalPeopleYouth')] }),
      youthRateGroupsAttendanceGroupNights: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('youthRateGroupsAttendanceGroupNights')] }),
      youthRateGroupsAttendancePeople: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('youthRateGroupsAttendancePeople')] }),
      standardRateGroupsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('standardRateGroupsRevenueGross')] }),
      youthRateGroupsRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('youthRateGroupsRevenueGross')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.groupCampingStandardAttendance([
      this.form.controls['standardRateGroupsTotalPeopleAdults'].value,
      this.form.controls['standardRateGroupsTotalPeopleYouth'].value,
      this.form.controls['standardRateGroupsTotalPeopleKids'].value,
    ]);
    this.standardRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['standardRateGroupsRevenueGross'].value
    ]);
    this.youthRevenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['youthRateGroupsRevenueGross'].value
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }
}