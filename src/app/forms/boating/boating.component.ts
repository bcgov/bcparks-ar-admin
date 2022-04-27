import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { FormulaService } from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-boating',
  templateUrl: './boating.component.html',
  styleUrls: ['./boating.component.scss'],
})
export class BoatingComponent extends BaseFormComponent {
  public fetchCount = 0;

  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected subAreaService: SubAreaService,
    protected formulaService: FormulaService,
    protected loadingService: LoadingService
  ) {
    super(
      formBuilder,
      formService,
      router,
      dataService,
      subAreaService,
      formulaService,
      loadingService
    );
    // push existing form data to parent subscriptions
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_BOATING)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.data = res;
            this.setForm();
          }
        })
    );

    this.subscriptions.push(
      loadingService
        .getFetchCount()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.fetchCount = res;
        })
    );

    this.setForm();
  }

  setForm() {
    // declare activity type
    (this.postObj['activity'] = 'Boating'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        boatAttendanceNightsOnDockControl: new FormControl(
          this.data.boatAttendanceNightsOnDock,
          Validators.pattern('^[0-9]*$')
        ),
        boatAttendanceNightsOnBouysControl: new FormControl(
          this.data.boatAttendanceNightsOnBouys,
          Validators.pattern('^[0-9]*$')
        ),
        boatAttendanceMiscellaneousControl: new FormControl(
          this.data.boatAttendanceMiscellaneous,
          Validators.pattern('^[0-9]*$')
        ),
        boatRevenueGrossControl: new FormControl(
          this.data.boatRevenueGross,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        boatAttendanceNightsOnDock: this.form.get(
          'boatAttendanceNightsOnDockControl'
        ),
        boatAttendanceNightsOnBouys: this.form.get(
          'boatAttendanceNightsOnBouysControl'
        ),
        boatAttendanceMiscellaneous: this.form.get(
          'boatAttendanceMiscellaneousControl'
        ),
        boatRevenueGross: this.form.get('boatRevenueGrossControl'),
        notes: this.form.get('varianceNotesControl'),
      });
  }

  public loading = false;

  async onSubmit() {
    this.loading = true;
    await super.submit();
    this.loading = false;
  }
}
