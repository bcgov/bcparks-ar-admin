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
import { NonResidentRevenueComponent } from '../../shared/components/non-resident-revenue/non-resident-revenue.component';
import { CancelButtonComponent } from '../cancel-button/cancel-button.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { VarianceWarningModalComponent } from '../variance-warning-modal/variance-warning-modal.component';

@Component({
    selector: 'app-backcountry-camping',
    templateUrl: './backcountry-camping.component.html',
    styleUrls: ['./backcountry-camping.component.scss'],
    imports: [ParkHeaderComponent, PopoverDirective, NgdsForms, CalculationDisplayComponent, NonResidentRevenueComponent, CancelButtonComponent, SubmitButtonComponent, VarianceWarningModalComponent]
})
export class BackcountryCampingComponent extends RootFormComponent {

  public nonResidentRevenueTotal: formulaResult = { result: null, formula: '' };

  constructor() {
    super();
    // declare activity type
    this.activityType = 'Backcountry Camping';
    this.accordionType = Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING;
    this.form = new UntypedFormGroup({
      peopleAdult: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleAdult')] }),
      peopleYouth: new UntypedFormControl(null, { nonNullable: true, validators: [Validators.min(0), this.varianceFieldInvalidator('peopleYouth')] }),
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
