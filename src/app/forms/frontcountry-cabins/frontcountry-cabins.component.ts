import { Component, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivityService } from 'src/app/services/activity.service';
import { RootFormComponent } from '../root-form/root-form.component';
import { UrlService } from 'src/app/services/url.service';
import { Constants } from 'src/app/shared/utils/constants';
import { VarianceService } from 'src/app/services/variance.service';
@Component({
    selector: 'app-frontcountry-cabins',
    templateUrl: './frontcountry-cabins.component.html',
    styleUrls: ['./frontcountry-cabins.component.scss'],
    standalone: false
})
export class FrontcountryCabinsComponent extends RootFormComponent {

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
    this.activityType = 'Frontcountry Cabins';
    this.accordionType = Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS;
    this.form = new UntypedFormGroup({
      totalAttendanceParties: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('totalAttendanceParties')] }),
      revenueGrossCamping: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('revenueGrossCamping')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.frontcountryCabinsAttendance(
      [
        this.form.controls['totalAttendanceParties'].value
      ],
      this.data?.config?.attendanceModifier
    );
    this.revenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['revenueGrossCamping']
        .value
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }

}