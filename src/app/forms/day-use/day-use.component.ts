import { ChangeDetectorRef, Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
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
  selector: 'app-day-use',
  templateUrl: './day-use.component.html',
  styleUrls: ['./day-use.component.scss'],
})
export class DayUseComponent extends BaseFormComponent {
  public attendanceTotal: formulaResult = { result: null, formula: '' };
  public picnicRevenueTotal: formulaResult = { result: null, formula: '' };
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };

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
        .watchItem(Constants.dataIds.ACCORDION_DAY_USE)
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
      (this.form = new UntypedFormGroup({
        peopleAndVehiclesTrailControl: new UntypedFormControl(
          {
            value: this.data.peopleAndVehiclesTrail,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        peopleAndVehiclesVehicleControl: new UntypedFormControl(
          {
            value: this.data.peopleAndVehiclesVehicle,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        peopleAndVehiclesBusControl: new UntypedFormControl(
          {
            value: this.data.peopleAndVehiclesBus,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        picnicRevenueShelterControl: new UntypedFormControl(
          {
            value: this.data.picnicRevenueShelter,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        picnicShelterPeopleControl: new UntypedFormControl(
          {
            value: this.data.picnicShelterPeople,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        picnicRevenueGrossControl: new UntypedFormControl(
          {
            value: this.data.picnicRevenueGross,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        otherDayUsePeopleHotSpringsControl: new UntypedFormControl(
          {
            value: this.data.otherDayUsePeopleHotSprings,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        otherDayUseRevenueHotSpringsControl: new UntypedFormControl(
          {
            value: this.data.otherDayUseRevenueHotSprings,
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
        peopleAndVehiclesTrail: this.form.get('peopleAndVehiclesTrailControl'),
        peopleAndVehiclesVehicle: this.form.get(
          'peopleAndVehiclesVehicleControl'
        ),
        peopleAndVehiclesBus: this.form.get('peopleAndVehiclesBusControl'),
        picnicRevenueShelter: this.form.get('picnicRevenueShelterControl'),
        picnicShelterPeople: this.form.get('picnicShelterPeopleControl'),
        picnicRevenueGross: this.form.get('picnicRevenueGrossControl'),
        otherDayUsePeopleHotSprings: this.form.get(
          'otherDayUsePeopleHotSpringsControl'
        ),
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
      [this.fields.peopleAndVehiclesTrail.value],
      [this.fields.peopleAndVehiclesVehicle.value],
      [this.fields.peopleAndVehiclesBus.value],
      this.data?.config?.attendanceVehiclesModifier,
      this.data?.config?.attendanceBusModifier
    );
    this.picnicRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.picnicRevenueGross.value,
    ]);
    this.otherRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.otherDayUseRevenueHotSprings.value,
    ]);
  }

  async onSubmit() {
    await super.submit();
  }
}
