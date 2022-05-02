import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';
import { LoadingService } from 'src/app/services/loading.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-frontcountry-cabins',
  templateUrl: './frontcountry-cabins.component.html',
  styleUrls: ['./frontcountry-cabins.component.scss'],
})
export class FrontcountryCabinsComponent extends BaseFormComponent {
  public revenueTotal: formulaResult = { result: null, formula: '' };

  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected subAreaService: SubAreaService,
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
      subAreaService,
      formulaService,
      loadingService,
      changeDetectior
    );
    // push existing form data to parent subscriptions
    this.subscriptions.add(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS)
        .pipe(takeWhile(() => this.alive))
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
      (this.form = new FormGroup({
        totalAttendancePartiesControl: new FormControl(
          {
            value: this.data.totalAttendanceParties,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        revenueGrossCampingControl: new FormControl(
          {
            value: this.data.revenueGrossCamping,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        varianceNotesControl: new FormControl({
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
    this.revenueTotal = this.formulaService.basicNetRevenue([
      this.fields.revenueGrossCamping.value,
    ]);
  }

  async onSubmit() {
    await super.submit();
  }
}
