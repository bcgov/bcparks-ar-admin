import { ChangeDetectorRef, Component } from '@angular/core';
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
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';
import { LoadingService } from 'src/app/services/loading.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-day-use',
  templateUrl: './day-use.component.html',
  styleUrls: ['./day-use.component.scss'],
})
export class DayUseComponent extends BaseFormComponent {
  public attendanceTotal: formulaResult = { result: null, formula: '' };
  public picnicRevenueTotal: formulaResult = { result: null, formula: '' };
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };

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
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_DAY_USE)
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
    (this.postObj['activity'] = 'Day Use'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        peopleAndVehiclesTrailControl: new FormControl(
          {
            value: this.data.peopleAndVehiclesTrail,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        peopleAndVehiclesVehicleControl: new FormControl(
          {
            value: this.data.peopleAndVehiclesVehicle,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        peopleAndVehiclesBusControl: new FormControl(
          {
            value: this.data.peopleAndVehiclesBus,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        picnicRevenueShelterControl: new FormControl(
          {
            value: this.data.picnicRevenueShelter,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        picnicRevenueGrossControl: new FormControl(
          {
            value: this.data.picnicRevenueGross,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        otherDayUseRevenueSkiiControl: new FormControl(
          {
            value: this.data.otherDayUseRevenueSkii,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        otherDayUseRevenueHotSpringsControl: new FormControl(
          {
            value: this.data.otherDayUseRevenueHotSprings,
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
        peopleAndVehiclesTrail: this.form.get('peopleAndVehiclesTrailControl'),
        peopleAndVehiclesVehicle: this.form.get(
          'peopleAndVehiclesVehicleControl'
        ),
        peopleAndVehiclesBus: this.form.get('peopleAndVehiclesBusControl'),
        picnicRevenueShelter: this.form.get('picnicRevenueShelterControl'),
        picnicRevenueGross: this.form.get('picnicRevenueGrossControl'),
        otherDayUseRevenueSkii: this.form.get('otherDayUseRevenueSkiiControl'),
        otherDayUseRevenueHotSprings: this.form.get(
          'otherDayUseRevenueHotSpringsControl'
        ),
        notes: this.form.get('varianceNotesControl'),
      });

    this.calculateTotals();
    super.subscribeToChanges(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.attendanceTotal = this.formulaService.dayUseVehicleAttendance(
      [this.fields.peopleAndVehiclesVehicle.value],
      [this.fields.peopleAndVehiclesBus.value],
      this.data?.config?.attendanceVehiclesModifier,
      this.data?.config?.attendanceBusModifier
    );
    this.picnicRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.picnicRevenueGross.value,
    ]);
    this.otherRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.otherDayUseRevenueSkii.value,
      this.fields.otherDayUseRevenueHotSprings.value,
    ]);
  }

  async onSubmit() {
    await super.submit();
  }
}
