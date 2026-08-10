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
import { ParkHeaderComponent } from '../park-header/park-header.component';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { NgdsForms } from '@digitalspace/ngds-forms';
import { CalculationDisplayComponent } from '../../shared/components/forms/calculation-display/calculation-display.component';
import { InfoTextComponent } from '../../shared/components/info-text/info-text.component';
import { NonResidentRevenueComponent } from '../../shared/components/non-resident-revenue/non-resident-revenue.component';
import { CancelButtonComponent } from '../cancel-button/cancel-button.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { VarianceWarningModalComponent } from '../variance-warning-modal/variance-warning-modal.component';

@Component({
    selector: 'app-group-camping',
    templateUrl: './group-camping.component.html',
    styleUrls: ['./group-camping.component.scss'],
    imports: [ParkHeaderComponent, PopoverDirective, NgdsForms, CalculationDisplayComponent, InfoTextComponent, NonResidentRevenueComponent, CancelButtonComponent, SubmitButtonComponent, VarianceWarningModalComponent]
})
export class GroupCampingComponent extends RootFormComponent {

  public standardRevenueTotal: formulaResult = { result: null, formula: '' };
  public youthRevenueTotal: formulaResult = { result: null, formula: '' };
  public nonResidentRevenueTotal: formulaResult = { result: null, formula: '' };

  constructor() {
    super();
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
      otherRevenueGrossNonResident: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueGrossNonResident')] }),
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
    this.nonResidentRevenueTotal = this.formulaService.nonResidentNetRevenue([
      this.form.controls['otherRevenueGrossNonResident'].value,
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }
}
