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

@Component({
  selector: 'app-boating',
  templateUrl: './boating.component.html',
  styleUrls: ['./boating.component.scss'],
})
export class BoatingComponent extends RootFormComponent {

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
    this.activityType = 'Boating';
    this.accordionType = Constants.dataIds.ACCORDION_BOATING;
    this.form = new UntypedFormGroup({
      boatAttendanceMiscellaneous: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('boatAttendanceMiscellaneous')] }),
      boatAttendanceNightsOnBouys: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('boatAttendanceNightsOnBouys')] }),
      boatAttendanceNightsOnDock: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('boatAttendanceNightsOnDock')] }),
      boatRevenueGross: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('boatRevenueGross')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(100)] }),
    });
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.boatingAttendance(
      [
        this.form.controls['boatAttendanceNightsOnDock'].value,
        this.form.controls['boatAttendanceNightsOnBouys'].value,
        this.form.controls['boatAttendanceMiscellaneous'].value
      ],
      this.data?.config?.attendanceModifier
    );
    this.revenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['boatRevenueGross'].value
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }

}
