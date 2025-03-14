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
    selector: 'app-backcountry-cabins',
    templateUrl: './backcountry-cabins.component.html',
    styleUrls: ['./backcountry-cabins.component.scss'],
    standalone: false
})
export class BackcountryCabinsComponent extends RootFormComponent {

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
    this.activityType = 'Backcountry Cabins';
    this.accordionType = Constants.dataIds.ACCORDION_BACKCOUNTRY_CABINS;
    this.form = new UntypedFormGroup({
      peopleAdult: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleAdult')] }),
      peopleChild: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleChild')] }),
      peopleFamily: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleFamily')] }),
      revenueFamily: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('revenueFamily')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.backcountryCabinsAttendance(
      [this.form.controls['peopleAdult'].value, this.form.controls['peopleChild'].value],
      [this.form.controls['peopleFamily'].value],
      this.data?.config?.attendanceModifier
    );
    this.revenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['revenueFamily'].value
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }

}
