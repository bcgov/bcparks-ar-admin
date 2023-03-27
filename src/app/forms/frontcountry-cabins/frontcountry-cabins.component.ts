import { ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';
import { LoadingService } from 'src/app/services/loading.service';
import { ValidationService } from 'src/app/services/validation.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-frontcountry-cabins',
  templateUrl: './frontcountry-cabins.component.html',
  styleUrls: ['./frontcountry-cabins.component.scss'],
})
export class FrontcountryCabinsComponent extends BaseFormComponent {
  public revenueTotal: formulaResult = { result: null, formula: '' };
  public attendanceTotal: formulaResult = { result: null, formula: '' };

  constructor(
    protected formBuilder: UntypedFormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected activityService: ActivityService,
    protected formulaService: FormulaService,
    protected loadingService: LoadingService,
    protected validationService: ValidationService,
    protected changeDetectior: ChangeDetectorRef
  ) {
    super(
      formBuilder,
      formService,
      router,
      dataService,
      activityService,
      formulaService,
      loadingService,
      changeDetectior
    );
    // push existing form data to parent subscriptions
    this.subscriptions.add(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS)
        .subscribe((res) => {
          if (res) {
            this.data = res;
            this.setForm();
          }
        })
    );
    this.setForm();
  }

  setForm() {
    // declare activity type
    (this.postObj['activity'] = 'Frontcountry Cabins'),
      // initialize the form and populate with values if they exist.
      (this.form = new UntypedFormGroup({
        totalAttendancePartiesControl: new UntypedFormControl(
          {
            value: this.data.totalAttendanceParties,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        revenueGrossCampingControl: new UntypedFormControl(
          {
            value: this.data.revenueGrossCamping,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        varianceNotesControl: new UntypedFormControl({
          value: this.data.notes,
          disabled: this.loading,
        }),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        totalAttendanceParties: this.form.get('totalAttendancePartiesControl'),
        revenueGrossCamping: this.form.get('revenueGrossCampingControl'),
        notes: this.form.get('varianceNotesControl'),
      });

    this.calculateTotals();
    super.subscribeToChanges(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.frontcountryCabinsAttendance(
      [
        this.fields.totalAttendanceParties.value
      ],
      this.data?.config?.attendanceModifier
    );
    this.revenueTotal = this.formulaService.basicNetRevenue([
      this.fields.revenueGrossCamping.value,
    ]);
  }

  async onSubmit() {
    await super.submit();
  }
}
