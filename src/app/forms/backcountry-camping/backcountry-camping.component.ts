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
    selector: 'app-backcountry-camping',
    templateUrl: './backcountry-camping.component.html',
    styleUrls: ['./backcountry-camping.component.scss'],
    standalone: false
})
export class BackcountryCampingComponent extends RootFormComponent {

  public nonResidentRevenueTotal: formulaResult = { result: null, formula: '' };

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
    this.activityType = 'Backcountry Camping';
    this.accordionType = Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING;
    this.form = new UntypedFormGroup({
      people: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('people')] }),
      grossCampingRevenue: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('grossCampingRevenue')] }),
      otherRevenueGrossNonResident: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('otherRevenueGrossNonResident')] }),
      notes: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.maxLength(this.maxVarianceNotesCharacters)] }),
    });
    this.calculateTotals();
    this.form?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.revenueTotal = this.formulaService.basicNetRevenue([
      this.form.controls['grossCampingRevenue'].value
    ]);
    this.nonResidentRevenueTotal = this.formulaService.nonResidentNetRevenue([
      this.form.controls['otherRevenueGrossNonResident'].value,
    ]);
  }

  async onSubmit() {
    await this.submit(true);
  }

}
